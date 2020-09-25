import store from '../redux/reducer'
import { setPoints } from '../redux/actions'

store.subscribe(() => console.log(store.getState()))

export default class Point {
  constructor({x, y, name, description}) {
    this.x = x
    this.y = y
    this.name = name
    this.description = description
    store.dispatch(setPoints([...Point.all(), this]))
  }

  // Static

  static all = () => store.getState().points

  static undo = () => {
    const points = this.all()
    store.dispatch(setPoints(points.slice(0, points.length - 1))
  }
}
