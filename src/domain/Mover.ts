import Direction from './Direction'
import BoundsChecker from './level/BoundsChecker'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class Mover {
  private _boundsChecker: BoundsChecker

  constructor(boundsChecker: BoundsChecker) {
    this._boundsChecker = boundsChecker
  }

  move(level: Level, playerPos: Position, direction: Direction): Position {
    return this._move(level, playerPos.row, playerPos.col, direction)
  }

  private _move(level: Level, oldRow: number, oldCol: number,
    direction: Direction): Position {
    const { rowInc, colInc } = direction
    const newRow = oldRow + rowInc, newCol = oldCol + colInc

    return !this._boundsChecker.inbounds(level, newRow, newCol) ||
      level.background[newRow][newCol] === OBSTACLE
      ? { row: oldRow, col: oldCol }
      : this._move(level, newRow, newCol, direction)
  }

}
