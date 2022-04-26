import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import { noop } from '../my-libs/funcs'
import myBind from '../my-libs/my-bind'

export type NextGameStateFn = (gameState: GameState) => GameState

export type UpdateGameStateFn$ = (nextGameStateFn: NextGameStateFn) => void

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
  private readonly _queue$: Direction[] = []
  private _resolve: (_?: unknown) => void = noop
  private _gs: GameState

  constructor() {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    if (this._queue$.length < 3) {
      this._queue$.push(direction)
      if (this._queue$.length === 1) this._move$()
    }
  }

  private async _move$(): Promise<void> {
    for (let i = 0; i < this._queue$.length; ++i) {
      // console.log({ i })

      // debugger
      const dir = this._queue$[i]

      let gs = this._gs
      console.log(54)
      this._updateGameStateFn$(gameState => this._gs = gameState.movePlayer(dir))
      if (gs === this._gs) {
        // console.log(1)
        continue
      }
      await Promise.race([
        new Promise(resolve => {
          // eslint-disable-next-line no-console
          // console.log('1resolve')
          this._resolve = resolve
        }),
        new Promise(resolve => {
          // setTimeout(resolve, 1000)
        }),
      ])

      for (; ;) {
        gs = this._gs
        // console.log(73)
        const bla = new Promise(resolve => {
          // eslint-disable-next-line no-console
          console.log('2resolve')
          this._resolve = resolve
        })

        this._updateGameStateFn$(gameState => this._gs = gameState.lambda())
        if (gs === this._gs) {
          // console.log(2)
          break
        }
        await Promise.race([
          bla,
          new Promise(resolve => {
            // setTimeout(resolve, 1000)
          }),
        ])
      }

    }
    this._queue$.length = 0
  }

  updateFinished$(): void {
    console.log(96)
    this._resolve()
  }

}
