import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (next: NextGameStateFn) => void

export interface GameStateUpdater {
  moveFinished$(): void
}

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export interface MoveFinishedListener {
  moveFinished$(): void
}

export default class Controller implements GameStateUpdater, MoveDispatcher,
  MoveFinishedListener {

  private _updateGameStateFn$: UpdateGameStateFn$ = () => {}
  private _queue$: Direction[] = []

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    if (this._queue$.length < 3) {

      const shouldTrigger = this._queue$.length === 0

      this._queue$.push(direction)

      if (shouldTrigger) this._moveOnce()
    }
  }

  private _moveOnce(): void{
    let dir: Direction
    if ((dir = this._queue$[0]) !== undefined) {
      this._updateGameStateFn$(gameState => gameState.movePlayer(dir))
    }
  }

  moveFinished$(): void {
    this._queue$.shift()
    this._moveOnce()
  }

}
