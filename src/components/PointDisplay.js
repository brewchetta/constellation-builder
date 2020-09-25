import React from 'react';

function Point({point, handlePointClick}) {

  return (
    <div className="point-center" style={{top: point.y, left: point.x}}>
      <div className="point-display" id={point.isConnectionHover() ? "hover-connection" : null} onClick={() => handlePointClick(point)} />
    </div>
  )

}

export default Point
