import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPoint } from '../redux/actions'

function InfoDisplay() {

  // State

  const dispatch = useDispatch()

  const currentPoint = useSelector(s => s.currentPoint)

  const [nameOpen, setNameOpen] = useState(false)

  const [descOpen, setDescOpen] = useState(false)

  const [name, setName] = useState('')

  const [desc, setDesc] = useState('')

  // Event Handlers

  const handleUnfocus = ({target}) => {
    if (target.id === "info-name") {
      dispatch(setCurrentPoint({...currentPoint, name: target.value}))
      setNameOpen(!nameOpen)
    } else if (target.id === "info-description") {
      dispatch(setCurrentPoint({...currentPoint, description: target.value}))
      setDescOpen(!descOpen)
    }
  }

  // Render

  return (
    <div id="info-display">

      <p id="info-point">Current Point: {currentPoint.x}, {currentPoint.y}</p>

      { nameOpen
        ? <input id="info-name"
        onChange={(e) => setName(e.target.value)}
        onBlur={handleUnfocus}
        type="text" value={name} />
        : <h3 id="info-name" onClick={() => setNameOpen(!nameOpen)}>Name: {currentPoint.name}</h3>
      }

      { descOpen
        ? <input id="info-description"
        onChange={(e) => setDesc(e.target.value)}
        onBlur={handleUnfocus}
        type="text" value={desc} />
        :<p id="info-description" onClick={() => setDescOpen(!descOpen)}> Description: {currentPoint.description}</p>
      }

    </div>
  )
}

export default InfoDisplay
