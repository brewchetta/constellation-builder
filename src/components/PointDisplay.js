import React from 'react';

function Point({point, handlePointClick}) {

  return (
    <div className="point-center" style={{top: point.y, left: point.x}}>
      <div className="point-display" onClick={() => handlePointClick(point)} />
    </div>
  )

}

export default Point
