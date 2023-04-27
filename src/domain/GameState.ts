/* eslint-disable no-use-before-define */
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

type Transition = State

export abstract class State {
  abstract onAddMove(d: Direction): Transition
  abstract onTransitionEnd(): Transition
}

export class IdleState extends State {
  override onAddMove(d: Direction): Transition {
    return new MovingState([d])
  }

  override onTransitionEnd(): Transition {
    return this
  }
}

export class MovingState extends State {
  static readonly MAX = 3

  constructor(private readonly _queue: Direction[]) {
    super()
  }

  override onAddMove(d: Direction): Transition {
    return this._queue.length < MovingState.MAX
      ? new MovingState([...this._queue, d])
      : this
  }

  override onTransitionEnd(): Transition {
    return this._queue.length >= 0
      ? new MovingState(this._queue.slice(1))
      : new ArrivingState()
  }
}

export class IncreasingLevelState extends State {
  override onAddMove(): Transition {
    return this
  }

  override onTransitionEnd(): Transition {
    return new IdleState()
  }
}

export class ArrivingState extends State {
  override onAddMove(): Transition {
    return this
  }

  override onTransitionEnd(): Transition {
    return new IdleState()
  }
}
