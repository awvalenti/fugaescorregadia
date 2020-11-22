import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (next: NextGameStateFn) => void

export default class Controller {

  private _updateGameStateFn$: UpdateGameStateFn$ = () => {}
  private _queue$: Direction[] = []

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  async dispatchMove$(direction: Direction): Promise<void> {
    if (this._queue$.length < 3) {

      const shouldTrigger = this._queue$.length === 0

      this._queue$.push(direction)

      if (shouldTrigger) {
        for (
          let dir: Direction | undefined;
          (dir = this._queue$[0]) !== undefined;
        ) {
          await this._updateGameStateFn$(gameState => gameState.movePlayer(dir!))
          this._queue$.shift()
        }
      }
    }
  }

}
