import React, { useState, useRef } from 'react'

import Line from '../classes/Line'
import Point from '../classes/Point'

import CurrentPoint from './CurrentPoint'
import LineDisplay from './LineDisplay'
import PointDisplay from './PointDisplay'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPoint, clearCurrentPoint } from '../redux/actions'

function Canvas() {

  // State

  const dispatch = useDispatch()

  const [currentPoint, points, lines] = useSelector(s => [s.currentPoint, s.points, s.lines])

  const [undoStack, setUndoStack] = useState([])

  const [unfocused, setUnfocused] = useState(false)

  // Refs

  const canvasEl = useRef(null)

  // Add elements

  const addPoint = ({x,y}) => {
    setUndoStack([...undoStack, "point"])
    return new Point({x,y})
  }

  const addLine = (point) => {
    if (currentPoint && !Line.findByPoints(point, currentPoint)) {
      setUndoStack([...undoStack, "line"])
      return new Line([point, currentPoint])
    }
    return true
  }

  // Remove elements

  const undo = () => {
    switch (undoStack[undoStack.length - 1]) {
      case "point":
        Point.undo()
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      case "line":
        Line.undo()
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      case "line && point":
        Point.undo()
        Line.undo()
        setUndoStack([...undoStack].slice(0, undoStack.length - 1))
        break;
      default:
    }
  }

  // Event handlers

  const getPositionOnCanvas = (e) => {
    // needs to return the mouse position compared to canvas position
    return {
      x: Math.round(e.clientX - canvasEl.current.getBoundingClientRect().left),
      y: Math.round(e.clientY - canvasEl.current.getBoundingClientRect().top)
    }
  }

  const handleKeyPress = (e) => {
    // code 90 = CTRL + Z
    if (e.keyCode === 90) {
      !currentPoint.x && undo()
      dispatch(clearCurrentPoint())
    }
    // code 88 = x
    if (e.keyCode === 88) {
      dispatch(clearCurrentPoint())
    }
  }

  const handleClick = (e) => {
    if (unfocused) {
      return setUnfocused(false)
    }
    const {x,y} = getPositionOnCanvas(e)
    const pointNearby = Point.nearbyPoints({x,y})
    if (!pointNearby && !currentPoint.x) {
      addPoint({x,y})
    } else if (!pointNearby && currentPoint.x) {
      const newPoint = addPoint({x,y})
      addLine(newPoint)
      dispatch(setCurrentPoint(newPoint))
      // manually set undoStack since addPoint / addLine overwrite each other
      setUndoStack([...undoStack, "line && point"])
    }
  }

  const handlePointClick = (point) => {
    if (point === currentPoint) {
      setCurrentPoint({})
    } else {
      !currentPoint.x && dispatch(setCurrentPoint(point))
      currentPoint.x && addLine(point) && dispatch(setCurrentPoint(point))
    }
  }

  const handleBlur = () => setUnfocused(true)

  // Render components

  const displayPoints = () => {
    return points.map((point,i) => <PointDisplay key={i} handlePointClick={handlePointClick} point={point} />)
  }

  const displayLines = () => {
    return lines.map(line => <LineDisplay key={JSON.stringify(line)} line={line} />)
  }

  return (
    <div id="canvas"
    onClick={handleClick}
    onKeyDown={handleKeyPress}
    ref={canvasEl}
    tabIndex="0"
    onBlur={handleBlur}>

      {currentPoint.x ? <CurrentPoint currentPoint={currentPoint} /> : null}

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
