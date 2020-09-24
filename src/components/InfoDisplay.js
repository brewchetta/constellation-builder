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

  const handleSave = (e) => {
    e.preventDefault()
    const newPoints = points.map(p => p === currentPoint ? {...currentPoint, name, description: desc} : p)
    dispatch(setPoints(newPoints))
  }

  // Render

  return (
    <form id="info-display">

      <input id="info-name" placeholder="add a star name here"
        onChange={(e) => setName(e.target.value)}
        type="text" value={name} />

      <textarea id="info-description" placeholder = "add a star description here"
        onChange={(e) => setDesc(e.target.value)}
        value={desc} />

      <input type="submit" onClick={handleSave} value="Save" />

      <p id="info-point">x{currentPoint.x}, y{currentPoint.y}</p>

    </form>
  )
}

export default InfoDisplay
