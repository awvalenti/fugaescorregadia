import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
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

  constructor(private _gameState$: GameState) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    this._gameState$ = this._gameState$.onAddMove(direction)
    this._updateGameStateFn$(this._gameState$)
  }

  updateFinished$(): void {
    console.log('updateFinished$(): {', this._gameState$.constructor.name)
    this._gameState$ = this._gameState$.onTransitionEnd()
    this._updateGameStateFn$(this._gameState$)
    console.log('updateFinished$(): }', this._gameState$.constructor.name)
  }

}
