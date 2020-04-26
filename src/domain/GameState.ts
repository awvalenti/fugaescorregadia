import Direction from './Direction'
import Level from './level/Level'
import Mover from './Mover'
import Position from './Position'

export default class GameState {

  private _level: Level
  private _playerPos: Position
  private _mover: Mover

  constructor(level: Level, mover: Mover,
    playerPos: Position = level.playerPos) {
    this._level = level
    this._playerPos = playerPos
    this._mover = mover
  }

  get level(): Level {
    return this._level
  }

  get playerPos(): Position {
    return this._playerPos
  }

  movePlayer(direction: Direction): GameState {
    return new GameState(this._level, this._mover,
      this._mover.move(this._level, this.playerPos, direction))
  }

}
