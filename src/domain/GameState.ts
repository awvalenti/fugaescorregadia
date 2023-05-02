/* eslint-disable no-use-before-define */
import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default abstract class GameState {

  // readonly level: Level
  // readonly playerPos: Position

  constructor(readonly level: Level, readonly playerPos: Position = level.playerPos) {
    // this.level = level
    // this.playerPos = playerPos
  }

  abstract onAddMove(d: Direction): GameState
  abstract onTransitionEnd(): GameState

}

export class IdleState extends GameState {
  // constructor(level: Level, playerPos: Position) {
  //   super(level, playerPos)
  // }

  override onAddMove(d: Direction): GameState {
    return new MovingState(this.level, this.playerPos, [d])
  }

  override onTransitionEnd(): GameState {
    return this
  }
}

export class MovingState extends GameState {
  static readonly MAX = 3

  constructor(level: Level, playerPos: Position, private readonly _queue: Direction[]) {
    super(level, playerPos)
  }

  override onAddMove(d: Direction): GameState {
    console.log(this._queue.length)

    return this._queue.length < MovingState.MAX
      ? new MovingState(this.level, this.playerPos, [...this._queue, d])
      : this
  }

  override onTransitionEnd(): GameState {
    return this._queue.length > 0
      ? new MovingState(this.level, this._move(this.playerPos, this._queue[0]), this._queue.slice(1))
      : new ArrivingState(this.level, this.playerPos)
  }

  private _move(oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    return !newPos.isInside(this.level) ||
      this.level.background[newPos.row][newPos.col] === OBSTACLE
      ? oldPos
      : this._move(newPos, direction)
  }

}

export class IncreasingLevelState extends GameState {
  override onAddMove(): GameState {
    return this
  }

  override onTransitionEnd(): GameState {
    return new IdleState(this.level, this.playerPos)
  }
}

export class ArrivingState extends GameState {
  override onAddMove(): GameState {
    return this
  }

  override onTransitionEnd(): GameState {
    return new IdleState(this.level, this.playerPos)
  }
}
