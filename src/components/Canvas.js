import React, { useState } from 'react'
import Point from './Point'
import Line from './Line'

const minDist = 20

function Canvas() {

  const [points, setPoints] = useState([])

  const [lines, setLines] = useState([])

  const [currentPoint, setCurrentPoint] = useState({})

  const addPoint = (x,y) => {
    setPoints([...points, {x,y}])
    setCurrentPoint({})
  }

  const addLine = ({x,y}) => {
    currentPoint && setLines([...lines, {
      p1: {x: currentPoint.x, y: currentPoint.y},
      p2: {x,y}
    }])
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
      x && addLine(point)
      x && setCurrentPoint(point)
    }
  }

  const displayPoints = () => {
    return points.map((point,i) => <Point key={i} handlePointClick={handlePointClick} point={point} />)
  }

  const displayLines = () => {
    return lines.map(line => <Line key={JSON.stringify(line)} p1={line.p1} p2={line.p2} />)
  }

  return (
    <div id="canvas" onClick={handleClick}>

      {currentPoint.x ? <span style={{color: 'white'}}>currentPoint: {currentPoint.x}, {currentPoint.y}</span> : null}

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
