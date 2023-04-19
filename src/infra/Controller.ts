import 'regenerator-runtime/runtime'
import { AppState } from '../domain/AppState'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'

export type UpdateGameState$ = (next: GameState) => void

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export interface UpdateFinishedListener {
  updateFinished$(): void
}

export interface StorageForUpdateGameStateFn {
  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void
}

export default class Controller implements
  MoveDispatcher, StorageForUpdateGameStateFn, UpdateFinishedListener {

  private _appState$: AppState
  private _gameState$: GameState
  private _resolve$: (_?: unknown) => void = noop
  private _updateGameStateFn$: UpdateGameState$ = noop

  constructor(gameState: GameState, appState: AppState) {
    this._gameState$ = gameState
    this._appState$ = appState
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  async dispatchMove$(direction: Direction): Promise<void> {
    const gameStates = this._appState$.move(this._gameState$, direction)

    for (const gs of gameStates) {
      this._gameState$ = gs
      this._updateGameStateFn$(gs)

      // eslint-disable-next-line no-new
      await new Promise(resolve => {
        this._resolve$ = resolve
      })
    }
  }

  updateFinished$() {
    this._resolve$()
  }

}
