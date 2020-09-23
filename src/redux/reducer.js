import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT } from './actionTypes'

const initialState = {
  currentPoint: {},
  minDist: 20
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_POINT:
      return {...state, currentPoint: action.payload}
    case CLEAR_CURRENT_POINT:
      return {...state, currentPoint: {}}
    default:
      return state
  }
}
