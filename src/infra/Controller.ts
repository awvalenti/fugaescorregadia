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
  private __gs3: GameState

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

  private async _startQueueProcessing(): Promise<void> {
    let dir: Direction | undefined
    while ((dir = this._queue$[0]) !== undefined) {
      const result = await this._processMove(dir)
      this._queue$.shift()
      if (result === 'discard-queue') this._queue$.length = 0
    }
  }

  private async _processMove(dir: Direction): Promise<QueueResult> {
    const firstStepResult = this._runFirstStep(dir)

    if (firstStepResult === 'nothing-changed') return 'keep-queue'

    const gss = this._runFurtherSteps(firstStepResult)

    for (const gs of gss) {
      await this._update$(gs)
    }

    return gss.some(gs => gs instanceof ChangingLevelGameState)
      ? 'discard-queue' : 'keep-queue'
  }

  private _runFirstStep(dir: Direction) {
    const gsPrime = this._gs3.movePlayer(dir)
    if (gsPrime === this._gs3) return 'nothing-changed'
    else return gsPrime
  }

  private async _update$(gsPrime: GameState) {
    this._updateGameStateFn$(() => gsPrime)
    await this._waitForAnimation()
    this._gs3 = gsPrime
  }

  private _runFurtherSteps(gs: GameState): GameState[] {
    const loop = (ret: GameState[], gs: GameState): GameState[] =>
      ret[ret.length - 1] instanceof StillGameState ? ret : loop([...ret, gs], gs.next())

    return loop([], gs)
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
