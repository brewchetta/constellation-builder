import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearCurrentPoint, setPoints } from '../redux/actions'

function InfoDisplay() {

  // State

  const dispatch = useDispatch()

  const currentPoint = useSelector(s => s.currentPoint)

  const points = useSelector(s => s.points)

  const [name, setName] = useState(currentPoint.name || "")

  const [desc, setDesc] = useState(currentPoint.description || "")

  // Effects

  useEffect(() => {
    setName(currentPoint.name || "")
    setDesc(currentPoint.description || "")
  }, [currentPoint])

  // Event Handlers

  const handleSave = () => {
    const newPoints = points.map(p => p === currentPoint ? {...currentPoint, name, description: desc} : p)
    dispatch(setPoints(newPoints))
    dispatch(clearCurrentPoint())
  }

  // Render

  return (
    <div id="info-display">

      <p id="info-point">Current Point: {currentPoint.x}, {currentPoint.y}</p>

      <input id="info-name"
        onChange={(e) => setName(e.target.value)}
        type="text" value={name} />

      <textarea id="info-description"
        onChange={(e) => setDesc(e.target.value)}
        value={desc} />

      <button type="button" onClick={handleSave}>Save</button>

    </div>
  )
}

export default InfoDisplay
