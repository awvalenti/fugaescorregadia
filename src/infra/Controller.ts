import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState, { AppState } from '../domain/GameState'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (next: GameState) => void

export interface StorageForUpdateGameStateFn {
  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void
}

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export interface UpdateFinishedListener {
  updateFinished$(): void
}

export default class Controller implements
  StorageForUpdateGameStateFn, MoveDispatcher, UpdateFinishedListener {

  private _updateGameStateFn$: UpdateGameStateFn$ = noop

  constructor(private _appState$: AppState) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    this._appState$ = this._appState$.onAddMove(direction)
    this._updateGameStateFn$(this._appState$.gameState)
    // console.log('dispatchMove$', this._appState$._queue)
  }

  updateFinished$(): void {
    this._appState$ = this._appState$.onTransitionEnd()
    this._updateGameStateFn$(this._appState$.gameState)
    // console.log('updateFinished$', this._appState$.constructor.name)
  }

}
