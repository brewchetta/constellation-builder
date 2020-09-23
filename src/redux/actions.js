import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT } from './actionTypes'

export const setCurrentPoint = point => ({ type: SET_CURRENT_POINT, payload: point });

export const clearCurrentPoint = () => ({ type: CLEAR_CURRENT_POINT });
