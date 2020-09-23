import React, { useState } from 'react'
import CurrentPoint from './CurrentPoint'
import Line from './Line'
import Point from './Point'

const minDist = 20

function Canvas() {

  const [points, setPoints] = useState([])

  const [lines, setLines] = useState([])

  const [currentPoint, setCurrentPoint] = useState({})

  const [undoStack, setUndoStack] = useState([])

  // Add elements

  const addPoint = (x,y) => {
    setPoints([...points, {x,y}])
    setCurrentPoint({})
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
        break;
      case "line":
        removeLine(lines[lines.length - 1])
        break;
      default:
    }
    setUndoStack([...undoStack].slice(0, undoStack.length - 1))
  }

  // Event handlers

  const handleKeyPress = (e) => {
    if (e.keyCode === 90) {
      !currentPoint.x && undo()
      setCurrentPoint({})
    }
  }

  const handleClick = (e) => {
    const x = e.clientX
    const y = e.clientY
    const pointNearby = points.find(p => Math.abs(p.x - x) < minDist && Math.abs(p.y - y) < minDist)
    if (!pointNearby && !currentPoint.x) {
      addPoint(x,y)
    } else if (!pointNearby && currentPoint.x) {
      addPoint(x,y)
      addLine({x,y})
    }
  }

  const handlePointClick = (point) => {
    const {x,y} = currentPoint
    if (point.x === x && point.y === y) {
      setCurrentPoint({})
    } else {
      !x && setCurrentPoint(point)
      x && addLine(point) && setCurrentPoint(point)
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
    tabIndex="0">

      {currentPoint.x ? <span style={{color: 'white'}}>currentPoint: {currentPoint.x}, {currentPoint.y}</span> : null}

      {currentPoint.x ? <CurrentPoint currentPoint={currentPoint} /> : null}

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
