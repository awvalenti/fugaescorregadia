import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type NextGameState = (gameState: GameState) => GameState

export type UpdateGameState = (next: NextGameState) => void

export default class Controller {

  private readonly _updateGameState: UpdateGameState

  constructor(updateGameState: UpdateGameState) {
    this._updateGameState = updateGameState
  }

  dispatchMove(direction: Direction): void {
    this._updateGameState(gameState => gameState.movePlayer(direction))
  }

}
