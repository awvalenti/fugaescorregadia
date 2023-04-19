import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'
import { Mover } from './Mover'

export type UpdateGameState$ = (next: GameState) => void

export interface StorageForUpdateGameStateFn {
  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void
}

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export interface UpdateFinishedListener {
  updateFinished$(): void
}

export default class Controller implements
  StorageForUpdateGameStateFn, MoveDispatcher, UpdateFinishedListener {

  private _updateGameStateFn$: UpdateGameState$ = noop
  // private readonly _queue$: Direction[] = []
  private _gameState$: GameState
  private readonly _mover: Mover
  private _resolve$: (_?: unknown) => void = noop

  constructor(initial: GameState, mover: Mover) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
    this._gameState$ = initial
    this._mover = mover
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  async dispatchMove$(direction: Direction): Promise<void> {
    if (this._resolve$ !== noop) return

    for (const gs of this._mover.update(this._gameState$, direction)) {
      this._gameState$ = gs
      this._updateGameStateFn$(gs)

      // eslint-disable-next-line no-new
      await new Promise(resolve => {
        this._resolve$ = resolve
      })
    }

    // if (this._queue$.length < 3) {
    //   this._queue$.push(direction)
    //   if (this._queue$.length === 1) this._moveOnce()
    // }
  }

  // private _moveOnce(): void {
  //   const dir = this._queue$[0]
  //   if (dir) {
  //     this._updateGameStateFn$(gameState => gameState.movePlayer(dir))
  //   }
  // }

  updateFinished$(): void {
    const r = this._resolve$
    this._resolve$ = noop
    r()
    // this._queue$.shift()
    // this._moveOnce()
  }

}
