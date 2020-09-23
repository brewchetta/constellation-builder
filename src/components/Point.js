import React from 'react';

function Point({point}) {

  return (
    <div className="point-center" style={{top: point.y, left: point.x}}>
      <div className="point-display" />
    </div>
  )

}

export default Point
