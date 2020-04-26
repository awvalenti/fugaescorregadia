import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class GameState {

  private _level: Level
  private _playerPos: Position

  constructor(level: Level) {
    this._level = level
    this._playerPos = level.playerPos
  }

  get playerPos(): Position {
    return this._playerPos
  }

  movePlayer(direction: Direction): Position {
    return this._movePlayer(this._level.playerPos, direction)
  }

  private _movePlayer(curPos: Position, dir: Direction): Position {
    const { background } = this._level

    const newPos = { row: curPos.row + dir.row, col: curPos.col + dir.col }

    return !this._level.inbounds(newPos) || background[newPos.row][newPos.col] === OBSTACLE
      ? curPos
      : this._movePlayer(newPos, dir)
  }

}
