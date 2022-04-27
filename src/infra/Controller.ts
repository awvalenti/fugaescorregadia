import 'regenerator-runtime/runtime'
import Direction from '../domain/Direction'
import { ChangingLevelGameState, GameState, StillGameState } from '../domain/GameState'
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

type QueueResult = 'keep-queue' | 'discard-queue'

export default class Controller implements
  StorageForUpdateGameStateFn, MoveDispatcher, UpdateFinishedListener {

  private _updateGameStateFn$: UpdateGameStateFn$ = noop
  private readonly _queue$: Direction[] = []
  private _resolve: (_?: unknown) => void = noop
  // private gs3: GameState
  private __gs3: GameState

  // private set _gs(gs: GameState) {
  //   console.log({ gs })

  //   this.gs3 = gs
  // }

  // private get _gs() {
  //   return this.gs3
  // }

  constructor(initialGameState: GameState) {
    myBind(this as UpdateFinishedListener, 'updateFinished$')
    this.__gs3 = initialGameState
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameStateFn$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

  dispatchMove$(direction: Direction): void {
    if (this._queue$.length < 3) {
      this._queue$.push(direction)
      if (this._queue$.length === 1) this._startQueueProcessing()
    }
  }

  // eslint-disable-next-line complexity
  private async _startQueueProcessing(): Promise<void> {
    for (const dir of this._queue$) {
      const result = await this._processOneMove(dir)
      if (result === 'discard-queue') break
    }
    // console.log(86)
    this._queue$.length = 0
  }

  // eslint-disable-next-line complexity
  private async _processOneMove(dir: Direction): Promise<QueueResult> {
    const firstResult = await this._processFirstStep(dir)

    if (firstResult === 'done') return 'keep-queue'

    const secondResult = await this._processSubsequentSteps(this._gs3)

    return secondResult
  }

  private async _processFirstStep(dir: Direction): Promise<'done' | 'not-done'> {
    const gsPrime = this._gs3.movePlayer(dir)
    if (gsPrime === this._gs3) {
      return 'done'
    }
    await this._update(gsPrime)

    return 'not-done'
  }

  private async _update(gsPrime: GameState) {
    this._updateGameStateFn$(() => gsPrime)
    await this._waitForAnimation()
    this._gs3 = gsPrime
  }

  private async _processSubsequentSteps(gs: GameState): Promise<QueueResult> {
    let result: QueueResult = 'keep-queue'

    let gsPrime = gs
    do {
      gsPrime = gsPrime.next()
      if (gsPrime instanceof ChangingLevelGameState) {
        result = 'discard-queue'
      }
      await this._update(gsPrime)
    } while (!(gsPrime instanceof StillGameState))

    return result
  }

  private async _waitForAnimation() {
    await Promise.race([
      new Promise(resolve => {
        this._resolve = resolve
      }),
      new Promise(resolve => {
        setTimeout(resolve, 1000)
      }),
    ])
  }

  set _gs3(g: GameState) {
    // eslint-disable-next-line no-console
    console.log({ g })
    this.__gs3 = g

  }

  get _gs3(): GameState {
    return this.__gs3
  }

  updateFinished$(): void {
    this._resolve()
  }

}
