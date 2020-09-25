import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
// import { setPoints } from '../redux/actions'

function InfoDisplay() {

  // State

  const currentPoint = useSelector(s => s.currentPoint)

  const [name, setName] = useState(currentPoint.name || "")

  const [description, setDesc] = useState(currentPoint.description || "")

  // Effects

  useEffect(() => {
    setName(currentPoint.name || "")
    setDesc(currentPoint.description || "")
  }, [currentPoint])

  // Event Handlers

  const handleSave = (e) => {
    e.preventDefault()
    currentPoint.name = name
    currentPoint.description = description
  }

  // Render

  return (
    <form id="info-display">

      <input id="info-name" placeholder="add a star name here"
        onChange={(e) => setName(e.target.value)}
        type="text" value={name} />

      <textarea id="info-description" placeholder = "add a star description here"
        onChange={(e) => setDesc(e.target.value)}
        value={description} />

      <input type="submit" onClick={handleSave} value="Save" />

      <p id="info-point">x{currentPoint.x}, y{currentPoint.y}</p>

    </form>
  )
}

export default InfoDisplay
