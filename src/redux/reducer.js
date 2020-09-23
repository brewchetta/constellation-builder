import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT, SET_LINES, SET_POINTS } from './actionTypes'

const initialState = {
  currentPoint: {},
  points: [],
  lines: [],
  minDist: 20
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_POINT:
      return {...state, currentPoint: action.payload}
    case CLEAR_CURRENT_POINT:
      return {...state, currentPoint: {}}
    case SET_POINTS:
      return {...state, points: action.payload}
    case SET_LINES:
      return {...state, lines: action.payload}
    default:
      return state
  }
}
