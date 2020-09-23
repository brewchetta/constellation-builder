import React from 'react';

const getWidthFromPoints = (line) => {
  const distX = line[0].x - line[1].x
  const distY = line[0].y - line[1].y
  return Math.sqrt((distX ** 2) + (distY ** 2)) - 10
}

const getMidFromPoints = (line) => {
  const midX = Math.abs(line[0].x - line[1].x) / 2 + Math.min(line[0].x, line[1].x)
  const midY = Math.abs(line[0].y - line[1].y) / 2 + Math.min(line[0].y, line[1].y)
  return {x: midX, y: midY}
}

const getAngleFromPoints = (line) => Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x) * 180 / Math.PI


function Line({line}) {

  const width = getWidthFromPoints(line)

  const midPoint = getMidFromPoints(line)

  const angle = getAngleFromPoints(line)

  return (
    <div className="line-mid-point" style={{left: midPoint.x, top: midPoint.y}}>
      <div className="line" style={{width, left: -width / 2, transform: `rotate(${angle}deg)`}} />
    </div>
  )

}

export default Line
