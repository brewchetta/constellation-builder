import React from 'react';

const getWidthFromPoints = (p1,p2) => {
  const distX = p1.x - p2.x
  const distY = p1.y - p2.y
  return Math.sqrt((distX ** 2) + (distY ** 2)) - 10
}

const getMidFromPoints = (p1,p2) => {
  const midX = Math.abs(p1.x - p2.x) / 2 + Math.min(p1.x, p2.x)
  const midY = Math.abs(p1.y - p2.y) / 2 + Math.min(p1.y, p2.y)
  return {x: midX, y: midY}
}

const getAngleFromPoints = (p1,p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI


function Point({p1,p2}) {

  const width = getWidthFromPoints(p1,p2)

  const midPoint = getMidFromPoints(p1,p2)

  const angle = getAngleFromPoints(p1,p2)

  return (
    <div className="line-mid-point" style={{left: midPoint.x, top: midPoint.y}}>
      <div className="line" style={{width, left: -width / 2, transform: `rotate(${angle}deg)`}} />
    </div>
  )

}

export default Point
