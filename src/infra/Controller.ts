import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import GameState, { ChangingLevelGameState } from '../domain/GameState'
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
  private __gs: GameState

  private set _gs(gs: GameState) {
    console.log({ gs })

    this.__gs = gs
  }

  private get _gs() {
    return this.__gs
  }

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

  // eslint-disable-next-line complexity
  private async _move$(): Promise<void> {
    for (let i = 0; i < this._queue$.length; ++i) {
      const dir = this._queue$[i]

      const gs1 = this._gs
      this._updateGameStateFn$(gameState => {
        this._gs = gameState.movePlayer(dir)
        return this._gs
      })
      if (gs1 === this._gs) {
        continue
      }
      await Promise.race([
        new Promise(resolve => {
          this._resolve = resolve
        }),
        new Promise(resolve => {
          setTimeout(resolve, 1000)
        }),
      ])

      let brake = false
      for (; ;) {
        const gs2 = this._gs
        const bla = new Promise(resolve => {
          this._resolve = resolve
        })

        this._updateGameStateFn$(gameState => {
          this._gs = gameState.next()
          return this._gs
        })
        if (gs2 === this._gs) {
          break
        } else if (gs2 instanceof ChangingLevelGameState) {
          brake = true
        }
        await Promise.race([
          bla,
          new Promise(resolve => {
            setTimeout(resolve, 1000)
          }),
        ])
      }
      // console.log(82)
      if (brake) {
        console.log(84)
        break
      }

    }
    // console.log(86)
    this._queue$.length = 0
  }

  updateFinished$(): void {
    // console.log(96)
    this._resolve()
  }

}
