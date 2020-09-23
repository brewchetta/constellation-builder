import React, { useState } from 'react'

function ControlsDisplay() {

  const [open, setOpen] = useState(false)

  const openedControls = () => (
    <>
      <span>Controls (click to close):</span>
      <br/>

      <span>Click empty space to add a point</span>
      <br/>

      <span>Clicking a point will create a line between it and another point or empty space</span>
      <br/>
      <span>CTRL + Z to undo the last line</span>
      <br/>
      <span>CTRL + X to undo the last point</span>
      <br/>
      <span>CTRL + C to remove current point</span>
      <br/>
    </>
  )

  const closedControls = () => <span>Click to open controls</span>

  return (
    <div onClick={() => setOpen(!open)}>
      {open ? openedControls() : closedControls()}
    </div>
  )
}

export default ControlsDisplay
