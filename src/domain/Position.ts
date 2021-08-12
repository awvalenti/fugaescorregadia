import Direction from './Direction'
import Level from './level/Level'

export default class Position {

  readonly row: number
  readonly col: number

  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }

  add(d: Direction): Position {
    return new Position(this.row + d.rowInc, this.col + d.colInc)
  }

  equals(p2: Position): boolean {
    return this.row === p2.row && this.col === p2.col
  }

  isInside(l: Level): boolean {
    return this.row >= 0 && this.row < l.rowCount &&
      this.col >= 0 && this.col < l.colCount
  }

}
