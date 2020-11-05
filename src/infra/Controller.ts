import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (next: NextGameStateFn) => void

export default class Controller {

  private _updateGameStateFn$: UpdateGameStateFn$ = () => {}
  private aberto = 0
  private fila = []

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  async dispatchMove$(direction: Direction): Promise<void> {
    if (this.aberto < 3) {

      ++this.aberto
      console.log(1)

      await this._updateGameStateFn$(gameState => gameState.movePlayer(direction))
      console.log(2)
      --this.aberto

    }
  }

}
