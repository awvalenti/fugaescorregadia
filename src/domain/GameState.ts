import Direction from './Direction'
import Level from './level/Level'
import Mover from './Mover'
import Position from './Position'

export default class GameState {

  readonly level: Level
  readonly playerPos: Position

  private _mover: Mover

  constructor(level: Level, mover: Mover,
    playerPos: Position = level.playerPos) {
    this.level = level
    this.playerPos = playerPos
    this._mover = mover
  }

  movePlayer(direction: Direction): GameState {
    return new GameState(this.level, this._mover,
      this._mover.move(this.level, this.playerPos, direction))
  }

}
