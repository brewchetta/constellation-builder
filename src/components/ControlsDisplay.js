import React, { useState } from 'react'

function ControlsDisplay() {

  const [open, setOpen] = useState(false)

  const openedControls = () => (
    <>
      <span>Controls (click to close):</span>
      <br/>
      <br/>

      <span>Click empty space to add a point</span>
      <br/>
      <br/>

      <span>Clicking a point will create a line between it and another point or empty space</span>
      <br/>
      <br/>

      <span>CTRL + Z to undo the last line or deselect the currently selected point</span>
      <br/>
      <br/>
    </>
  )

  const closedControls = () => <span>Controls (click to open)</span>

  return (
    <div onClick={() => setOpen(!open)}>
      {open ? openedControls() : closedControls()}
    </div>
  )
}

export default ControlsDisplay
