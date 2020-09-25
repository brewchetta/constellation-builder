import { SET_CURRENT_POINT, CLEAR_CURRENT_POINT, SET_POINTS, SET_LINES, SET_CONNECTION_HOVER, CLEAR_CONNECTION_HOVER } from './actionTypes'

export const setCurrentPoint = point => ({ type: SET_CURRENT_POINT, payload: point });

export const clearCurrentPoint = () => ({ type: CLEAR_CURRENT_POINT });

export const setPoints = points => ({ type: SET_POINTS, payload: points })

export const setLines = lines => ({ type: SET_LINES, payload: lines })

export const setConnectionHover = connection => ({ type: SET_CONNECTION_HOVER, payload: connection })

export const clearConnectionHover = () => ({ type: CLEAR_CONNECTION_HOVER })
