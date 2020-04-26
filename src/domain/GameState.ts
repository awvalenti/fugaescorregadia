import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class GameState {

  private _level: Level
  private _playerPos: Position

  constructor(level: Level, playerPos: Position = level.playerPos) {
    this._level = level
    this._playerPos = playerPos
  }

  get level(): Level {
    return this._level
  }

  get playerPos(): Position {
    return this._playerPos
  }

  movePlayer(direction: Direction): GameState {
    return new GameState(this._level, this._movePlayer(
      this.playerPos, direction))
  }

  private _movePlayer(curPos: Position, dir: Direction): Position {
    const { background } = this._level

    const newPos = { row: curPos.row + dir.row, col: curPos.col + dir.col }

    return !this._level.inbounds(newPos) || background[newPos.row][newPos.col] === OBSTACLE
      ? curPos
      : this._movePlayer(newPos, dir)
  }

}
