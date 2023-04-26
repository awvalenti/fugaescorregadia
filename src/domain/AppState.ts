import { UpdateGameState$ } from '../infra/Controller'
import { Mover } from '../infra/Mover'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'
import Direction from './Direction'
import GameState from './GameState'
import Queue from './Queue'

export interface StorageForUpdateGameStateFn {
  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void
}

export interface UpdateFinishedListener {
  updateFinished$(): void
}

export class AppState implements UpdateFinishedListener {

  constructor(
    private _gameState$: GameState,
    // private readonly _queue: Direction[],
    private readonly _queue: Queue,
    private readonly _mover: Mover,
    private _resolve$: (_?: unknown) => void = noop,
  ) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  move$(d: Direction) {
    // if (this._queue.length > 0) return this

    // const gameStates = this._mover.update(this._gameState$, d)

    // if (gameStates.length === 1 && gameStates[0] === this._gameState$) return this

    return new AppState(gs, this._queue.handle$(d), this._mover, this._resolve$)
  }

  updateFinished$() {
    // this._resolve$()
    this._queue.updateFinished$()
  }

}
