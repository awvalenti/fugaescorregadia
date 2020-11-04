import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (next: NextGameStateFn) => void

export default class Controller {

  private _updateGameStateFn$: UpdateGameStateFn$ = () => {}

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void{
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    this._updateGameStateFn$(gameState => gameState.movePlayer(direction))
  }

}
