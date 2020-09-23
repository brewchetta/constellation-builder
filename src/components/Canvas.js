import React, { useState, useRef } from 'react'

import CurrentPoint from './CurrentPoint'
import Line from './Line'
import Point from './Point'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPoint, clearCurrentPoint } from '../redux/actions'

function Canvas() {

  // State

  const dispatch = useDispatch()

  const currentPoint = useSelector(s => s.currentPoint)

  const minDist = useSelector(s => s.minDist)

  const [points, setPoints] = useState([])

  const [lines, setLines] = useState([])

  const [undoStack, setUndoStack] = useState([])

  // Refs

  const canvasEl = useRef(null)

  // Add elements

  const addPoint = (x,y) => {
    setPoints([...points, {x,y}])
    dispatch(clearCurrentPoint())
    setUndoStack([...undoStack, "point"])
    return {x,y}
  }


  const addLine = ({x,y}) => {
    currentPoint && setLines([...lines, {
      p1: {x: currentPoint.x, y: currentPoint.y},
      p2: {x,y}
    }])
    currentPoint && setUndoStack([...undoStack, "line"])
    return { p1: {x: currentPoint.x, y: currentPoint.y}, p2: {x,y} }
  }

  // Remove elements

  const removePoint = (pointToRemove) => {
    setPoints([...points].filter(p => p !== pointToRemove))
  }

  const removeLine = (lineToRemove) => {
    setLines([...lines].filter(l => l !== lineToRemove))
  }

  const undo = () => {
    switch (undoStack[undoStack.length - 1]) {
      case "point":
        removePoint(points[points.length - 1])
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      case "line":
        removeLine(lines[lines.length - 1])
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      case "line && point":
        removePoint(points[points.length - 1])
        removeLine(lines[lines.length - 1])
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      default:
    }
  }

  // Event handlers

  const getPositionOnCanvas = (e) => {
    // needs to return the mouse position compared to the position of the canvas on the page
    return {
      x: Math.round(e.clientX - canvasEl.current.getBoundingClientRect().left),
      y: Math.round(e.clientY - canvasEl.current.getBoundingClientRect().top)
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 90) {
      !currentPoint.x && undo()
      dispatch(clearCurrentPoint())
    }
    e.keyCode === 88 && console.log(undoStack)
  }

  const handleClick = (e) => {
    const {x,y} = getPositionOnCanvas(e)
    const pointNearby = points.find(p => Math.abs(p.x - x) < minDist && Math.abs(p.y - y) < minDist)
    if (!pointNearby && !currentPoint.x) {
      addPoint(x,y)
    } else if (!pointNearby && currentPoint.x) {
      addPoint(x,y)
      addLine({x,y})
      // manually set undoStack since addPoint / addLine overwrite each other
      setUndoStack([...undoStack, "line && point"])
    }
  }

  const handlePointClick = (point) => {
    const {x,y} = currentPoint
    if (point.x === x && point.y === y) {
      setCurrentPoint({})
    } else {
      !x && dispatch(setCurrentPoint(point))
      x && addLine(point) && dispatch(setCurrentPoint(point))
    }
  }

  // Render components

  const displayPoints = () => {
    return points.map((point,i) => <Point key={i} handlePointClick={handlePointClick} point={point} />)
  }

  const displayLines = () => {
    return lines.map(line => <Line key={JSON.stringify(line)} p1={line.p1} p2={line.p2} />)
  }

  return (
    <div id="canvas"
    onClick={handleClick}
    onKeyDown={handleKeyPress}
    ref={canvasEl}
    tabIndex="0">

      {currentPoint.x ? <CurrentPoint currentPoint={currentPoint} /> : null}

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
