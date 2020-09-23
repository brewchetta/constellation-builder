import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT } from './actionTypes'

const initialState = {
  currentPoint: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_POINT":
      {...state, currentPoint: action.payload}
      break;
    case "CLEAR_CURRENT_POINT":
      {...state, currentPoint: {}}
      break;
    default:
      return state
  }
}
