import React, { useState } from 'react'
import Point from './Point'

function Canvas() {

  const [points, setPoints] = useState([])

  const handleClick = (e) => {
    const x = e.clientX
    const y = e.clientY
    // console.log(points)
    setPoints([...points, {x,y}])
  }

  const displayPoints = () => {
    return points.map((point,i) => <Point key={i} point={point} />)
  }

  return (
    <div id="canvas" onClick={handleClick}>

      {displayPoints()}

    </div>
  )
}

export default Canvas;
