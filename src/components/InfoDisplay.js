import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPoint, setConnectionHover, clearConnectionHover } from '../redux/actions'

function InfoDisplay() {

  // State

  const dispatch = useDispatch()

  const currentPoint = useSelector(s => s.currentPoint)

  const [name, setName] = useState(currentPoint.name || "")

  const [description, setDesc] = useState(currentPoint.description || "")

  // Effects

  useEffect(() => {
    setName(currentPoint.name || "")
    setDesc(currentPoint.description || "")
    dispatch(clearConnectionHover())
  }, [currentPoint])

  // Event Handlers

  const handleSave = e => {
    e.preventDefault()
    currentPoint.name = name
    currentPoint.description = description
  }

  const handleConnectClick = point => dispatch(setCurrentPoint(point))

  // Render

  const renderConnectedPoints = () => {
    return currentPoint.connectedPoints().map(p => {
      return (
        <li key={`connection ${p.x} ${p.y}`}
          className="info-connection"
          onMouseEnter={() => dispatch(setConnectionHover(p))}
          onMouseLeave={() => dispatch(clearConnectionHover())}
          onClick={() => handleConnectClick(p)}
          >{ p.name ? p.name : `${p.x},${p.y}` }</li>
      )
    });
  }

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

      <p>Connections: </p>

      <ul>

        {renderConnectedPoints()}

      </ul>

    </form>
  )
}

export default InfoDisplay
