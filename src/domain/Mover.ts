import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class Mover {

  move(level: Level, playerPos: Position, direction: Direction): Position {
    return this._move(level, playerPos, direction)
  }

  private _move(level: Level, oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    const newRow = newPos.row, newCol = newPos.col

    return !newPos.isInside(level) ||
      level.background[newRow][newCol] === OBSTACLE
      ? oldPos
      : this._move(level, newPos, direction)
  }

}
