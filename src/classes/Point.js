import store from '../redux/reducer'
import { setPoints } from '../redux/actions'

const minDist = 20

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
    store.dispatch(setPoints(points.slice(0, points.length - 1)))
  }

  static findByCoordinates = ({x,y}) => this.all().find(p => p.x === x && p.y === y)

  static nearbyPoints = ({x,y}) => {
    return this.all().find(p => Math.abs(p.x - x) < minDist && Math.abs(p.y - y) < minDist)
  }

  // Instance

  lines = () => store.getState().lines.filter(line => line.points.includes(this))

}
