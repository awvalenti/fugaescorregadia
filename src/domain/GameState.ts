import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class GameState {

  readonly level: Level
  readonly playerPos: Position

  constructor(level: Level, playerPos: Position = level.playerPos) {
    this.level = level
    this.playerPos = playerPos
  }

  movePlayer(direction: Direction): GameState {
    return new GameState(this.level, this._move(this.playerPos, direction))
  }

  private _move(oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    return !newPos.isInside(this.level) ||
      this.level.background[newPos.row][newPos.col] === OBSTACLE
      ? oldPos
      : this._move(newPos, direction)
  }

}
