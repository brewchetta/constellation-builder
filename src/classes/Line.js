import store from '../redux/reducer'

import { setLines } from '../redux/actions'

store.subscribe(() => console.log(store.getState()))

export default class Line {
  constructor(points) {
    this.points = points
    store.dispatch(setLines([...Line.all(), this]))
  }

  static all = () => store.getState().lines

  midPoint = () => {
    const x = Math.abs(this.points[0].x - this.points[1].x) / 2 + Math.min(this.points[0].x, this.points[1].x)
    const y = Math.abs(this.points[0].y - this.points[1].y) / 2 + Math.min(this.points[0].y, this.points[1].y)
    return {x, y}
  }

  width = () => {
    const distX = this.points[0].x - this.points[1].x
    const distY = this.points[0].y - this.points[1].y
    return Math.sqrt((distX ** 2) + (distY ** 2)) - 10
  }

  angle = () => {
    return Math.atan2(this.points[1].y - this.points[0].y, this.points[1].x - this.points[0].x) * 180 / Math.PI
  }

}
