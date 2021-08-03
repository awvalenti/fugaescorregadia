import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import myBind from '../my-libs/my-bind'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (nextGameStateFn: NextGameStateFn) => void

export interface MoveDispatcher {
  dispatchMove$(direction: Direction): void
}

export interface MoveFinishedListener {
  moveFinished$(): void
}

export default class Controller implements MoveDispatcher, MoveFinishedListener {

  private _updateGameStateFn$: UpdateGameStateFn$ = () => {}
  private _queue$: Direction[] = []

  constructor() {
    myBind(this as MoveFinishedListener, 'moveFinished$')
  }

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
    const dir = this._queue$[0]
    if (dir) {
      this._updateGameStateFn$(gameState => gameState.movePlayer(dir))
    }
  }

  moveFinished$(): void {
    this._queue$.shift()
    this._moveOnce()
  }

}
