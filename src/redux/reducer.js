import { createStore } from 'redux'

import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT, SET_LINES, SET_POINTS, SET_CONNECTION_HOVER, CLEAR_CONNECTION_HOVER } from './actionTypes'


const initialState = {
  connectionHover: {},
  currentPoint: {},
  points: [],
  lines: [],
  minDist: 20
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_POINT:
      return {...state, currentPoint: action.payload}
    case CLEAR_CURRENT_POINT:
      return {...state, currentPoint: {}}
    case SET_POINTS:
      return {...state, points: action.payload}
    case SET_LINES:
      return {...state, lines: action.payload}
    case SET_CONNECTION_HOVER:
      return {...state, connectionHover: action.payload}
    case CLEAR_CONNECTION_HOVER:
      return {...state, connectionHover: {}}
    default:
      return state
  }
}

export default createStore(reducer)
