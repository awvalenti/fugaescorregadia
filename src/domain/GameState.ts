/* eslint-disable no-use-before-define */
import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { GOAL, OBSTACLE } from './TileId'

export default class GameState {

  readonly level: Level
  readonly playerPos: Position

  constructor(level: Level, playerPos: Position = level.playerPos) {
    this.level = level
    this.playerPos = playerPos
  }

  movePlayer(direction: Direction): GameState {
    const newPos = this._move(this.playerPos, direction)
    return newPos.equals(this.playerPos)
      ? this
      : new GameState(this.level, newPos)
  }

  private _move(oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    if (!newPos.isInside(this.level)) return oldPos
    switch (this.level.background[newPos.row][newPos.col]) {
      case OBSTACLE: return oldPos
      case GOAL: return newPos
      default: return this._move(newPos, direction)
    }
  }

}

type Transition = AppState

export abstract class AppState {
  constructor(
    readonly gameState: GameState
  ) { }

  abstract onAddMove(d: Direction): Transition
  abstract onTransitionEnd(): Transition
}

export class IdleState extends AppState {
  override onAddMove(d: Direction): Transition {
    return new MovingState(this.gameState, [d])
  }

  override onTransitionEnd(): Transition {
    return this
  }
}

export class MovingState extends AppState {
  static readonly MAX = 3

  constructor(gameState: GameState, private readonly _queue: Direction[]) {
    super(gameState)
  }

  override onAddMove(d: Direction): Transition {
    return this._queue.length < MovingState.MAX
      ? new MovingState(this.gameState, [...this._queue, d])
      : this
  }

  override onTransitionEnd(): Transition {
    return this._queue.length > 0
      ? new MovingState(this.gameState.movePlayer(this._queue[0]), this._queue.slice(1))
      : new IdleState(this.gameState)
  }
}

export class IncreasingLevelState extends AppState {
  override onAddMove(): Transition {
    return this
  }

  override onTransitionEnd(): Transition {
    return new IdleState(this.gameState)
  }
}

// export class ArrivingState extends AppState {
//   override onAddMove(): Transition {
//     return this
//   }

//   override onTransitionEnd(): Transition {
//     return new IdleState(this.gameState)
//   }
// }
