/* eslint-disable no-use-before-define */
import Direction from './Direction'
import Level from './level/Level'
import LevelRepo from './level/LevelRepo'
import Position from './Position'
import { GOAL } from './Tile'

type GsTransition =
  | {
    type: 'MOVE',
    to: Position
  }
  | {
    type: 'ADVANCE_LEVEL',
    to: Level
  }
  | {
    type: 'NOTHING'
  }
  | {
    type: 'COMPOSITE',
    transitions: GsTransition[],
  }

export default class GameState {

  constructor(
    private _levelRepo: LevelRepo,
    readonly level: Level,
    readonly playerPos: Position = level.playerPos,
  ) { }

  movePlayer(direction: Direction): GameState {
    const newPos = this._move(this.playerPos, direction)
    return this._copy(newPos)
  }

  private _copy(playerPos: Position, level = this.level): GameState {
    return new GameState(this._levelRepo, level, playerPos)
  }

  private _move(oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    return this.level.get(newPos).stopBefore()
      ? oldPos
      : this.level.get(newPos).stopInside()
        ? newPos
        : this._move(newPos, direction)
  }

}

type Transition = AppState

export abstract class AppState {
  constructor(
    readonly gameState: GameState,
  ) { }

  abstract onAddMove(d: Direction): Transition
  abstract onTransitionEnd(): Transition
}

export class IdleState extends AppState {
  override onAddMove(d: Direction): Transition {
    return new MovingState(this.gameState.movePlayer(d), [])
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
    return this._queue.length < MovingState.MAX - 1
      ? new MovingState(this.gameState, [...this._queue, d])
      : this
  }

  override onTransitionEnd(): Transition {
    return this._queue.length > 0
      ? new MovingState(this.gameState.movePlayer(this._queue[0]), this._queue.slice(1))
      : this.gameState.level.get(this.gameState.playerPos) === GOAL
        ? new IncreasingLevelState(this.gameState)
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
