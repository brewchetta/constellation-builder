import React, { useState } from 'react'
import Point from './Point'
import Line from './Line'

function Canvas() {

  const [points, setPoints] = useState([])

  const [currentPoint, setCurrentPoint] = useState({})

  const handleClick = (e) => {
    const x = e.clientX
    const y = e.clientY
    if (!points.find(p => Math.abs(p.x - x) < 10 && Math.abs(p.y - y) < 10)) {
      setPoints([...points, {x,y}])
      setCurrentPoint({})
    }
  }

  const handlePointClick = (point) => {
    setCurrentPoint(point)
  }

  const displayPoints = () => {
    return points.map((point,i) => <Point key={i} handlePointClick={handlePointClick} point={point} />)
  }

  const displayLines = () => {
    return points.map((point, i) => {
      const prevPoint = points[i - 1]
      return prevPoint ? <Line key={JSON.stringify(point)} p1={point} p2={prevPoint} /> : null
    })
  }

  return (
    <div id="canvas" onClick={handleClick}>

      <span style={{color: 'white'}}>currentPoint: {currentPoint.x}, {currentPoint.y}</span>

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
