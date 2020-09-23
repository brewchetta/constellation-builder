import React from 'react'
import { useSelector } from 'react-redux'

function InfoDisplay() {

  const currentPoint = useSelector(s => s.currentPoint)

  return (
    <div id="info-display">

      <p>Current Point: {currentPoint.x}, {currentPoint.y}</p>

      <h3>Name: {currentPoint.name}</h3>

      <p> Description: {currentPoint.description}</p>

    </div>
  )
}

export default InfoDisplay
