import 'regenerator-runtime/runtime'
import { AppState } from '../domain/AppState'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type UpdateGameState$ = (next: GameState) => void

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export default class Controller implements MoveDispatcher {

  private _appState$: AppState

  constructor(appState: AppState) {
    this._appState$ = appState
  }

  dispatchMove$(direction: Direction): void {
    this._appState$ = this._appState$.move$(direction)
  }

}
