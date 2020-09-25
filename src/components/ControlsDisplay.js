import React from 'react'

function ControlsDisplay() {

  return (
    <div>
      <span>Controls:</span>
      <br/>
      <br/>

      <span>Click empty space to add a point</span>
      <br/>
      <br/>

      <span>Clicking a point will create a line between it and another point or empty space</span>
      <br/>
      <br/>

      <span>CTRL + Z to undo the last line</span>
      <br/>
      <br/>

      <span>X to deselect current point</span>
      <br/>
      <br/>
    </div>
  )
}

export default ControlsDisplay
