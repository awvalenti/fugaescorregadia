import { UpdateGameState$ } from '../infra/Controller'
import { Mover } from '../infra/Mover'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'
import Direction from './Direction'
import GameState from './GameState'

export interface StorageForUpdateGameStateFn {
  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void
}

export interface UpdateFinishedListener {
  updateFinished$(): void
}

export class AppState implements StorageForUpdateGameStateFn, UpdateFinishedListener {

  constructor(
    private _gameState$: GameState,
    private readonly _queue: Direction[],
    private readonly _mover: Mover,
    private _updateGameStateFn$: UpdateGameState$ = noop,
    private _resolve$: (_?: unknown) => void = noop,
  ) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  async move$(d: Direction): Promise<AppState> {
    if (this._queue.length > 0) return this

    const gameStates = this._mover.update(this._gameState$, d)

    if (gameStates.length === 1 && gameStates[0] === this._gameState$) return this

    for (const gs of gameStates) {
      this._gameState$ = gs
      this._updateGameStateFn$(gs)

      // eslint-disable-next-line no-new
      await new Promise(resolve => {
        this._resolve$ = resolve
      })
    }

    return new AppState(gameStates.at(-1)!, [], this._mover, this._updateGameStateFn$, this._resolve$)
  }

  updateFinished$() {
    this._resolve$()
  }

}
