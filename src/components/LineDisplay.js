import React from 'react';

import Line from '../classes/Line'

function LineDisplay({line}) {

  const width = line.width()

  const midPoint = line.midPoint()

  return (
    <div className="line-mid-point" style={{left: midPoint.x, top: midPoint.y}}>
      <div className="line" style={{width, left: -width / 2, transform: `rotate(${line.angle()}deg)`}} />
    </div>
  )

}

export default Line
