/* eslint-disable no-use-before-define */
import Direction from './Direction'
import Level from './level/Level'
import { Mover } from './Mover'
import Position from './Position'
import { GOAL } from './TileId'

export default class GameState {

  readonly level: Level
  readonly playerPos: Position

  constructor(level: Level, playerPos: Position = level.playerPos) {
    this.level = level
    this.playerPos = playerPos
  }

}

type Transition = AppState

export abstract class AppState {
  constructor(
    readonly _mover: Mover,
    readonly gameState: GameState,
  ) { }

  abstract onAddMove(d: Direction): Transition
  abstract onTransitionEnd(): Transition
}

export class IdleState extends AppState {
  override onAddMove(d: Direction): Transition {
    return new MovingState(this._mover, this._mover.update(this.gameState, d), [])
  }

  override onTransitionEnd(): Transition {
    return this
  }
}

export class MovingState extends AppState {
  static readonly MAX = 3

  constructor(mover: Mover, gameState: GameState, private readonly _queue: Direction[]) {
    super(mover, gameState)
  }

  override onAddMove(d: Direction): Transition {
    return this._queue.length < MovingState.MAX - 1
      ? new MovingState(this._mover, this.gameState, [...this._queue, d])
      : this
  }

  override onTransitionEnd(): Transition {
    return this._queue.length > 0
      ? new MovingState(this._mover, this._mover.update(this.gameState, this._queue[0]), this._queue.slice(1))
      : this.gameState.level.get(this.gameState.playerPos) === GOAL
        ? new IncreasingLevelState(this._mover, this.gameState)
        : new IdleState(this._mover, this.gameState)
  }
}

export class IncreasingLevelState extends AppState {
  override onAddMove(): Transition {
    return this
  }

  override onTransitionEnd(): Transition {
    return new IdleState(this._mover, this.gameState)
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
