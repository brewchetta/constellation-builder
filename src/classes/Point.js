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

  static all = () => store.getState().points
}
