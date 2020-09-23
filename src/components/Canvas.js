import React, { useState } from 'react'
import Point from './Point'
import Line from './Line'

function Canvas() {

  const [points, setPoints] = useState([])

  const handleClick = (e) => {
    const x = e.clientX
    const y = e.clientY
    setPoints([...points, {x,y}])
  }


  const displayPoints = () => {
    return points.map((point,i) => <Point key={i} point={point} />)
  }

  const displayLines = () => {
    return points.map((point, i) => {
      const prevPoint = points[i - 1]
      return prevPoint ? <Line key={JSON.stringify(point)} p1={point} p2={prevPoint} /> : null
    })
  }

  return (
    <div id="canvas" onClick={handleClick}>

      {displayPoints()}
      {displayLines()}

    </div>
  )
}

export default Canvas;
