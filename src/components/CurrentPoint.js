import React from 'react'

function CurrentPoint({currentPoint}) {


  return (
    <div id="selected-point"
    style={{left: currentPoint.x, top: currentPoint.y}}>

      <div id="selected-point-display" />

    </div>
  )


}

export default CurrentPoint
