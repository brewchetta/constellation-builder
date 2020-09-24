import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clearCurrentPoint, setPoints } from '../redux/actions'

function InfoDisplay() {

  // State

  const dispatch = useDispatch()

  const [points, lines, currentPoint] = useSelector(s => [s.points, s.lines, s.currentPoint])

  const [name, setName] = useState(currentPoint.name || "")

  const [desc, setDesc] = useState(currentPoint.description || "")

  // Effects

  useEffect(() => {
    setName(currentPoint.name || "")
    setDesc(currentPoint.description || "")
  }, [currentPoint])

  // Helpers

  const filterLinesByPoint = ({x,y}) => {
    return lines.filter(li => (li[0].x === x && li[0].y === y) || (li[1].x === x && li[1].y === y))
  }

  const getPointsByLine = (line) => {
    return points.filter(p => line.find(lp => lp.x === p.x && lp.y === p.y))
  }

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
