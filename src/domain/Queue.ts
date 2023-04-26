import { UpdateGameState$ } from '../infra/Controller'
import { Mover } from '../infra/Mover'
import { noop } from '../my-libs/funcs'
import { StorageForUpdateGameStateFn } from './AppState'
import Direction from './Direction'
import GameState from './GameState'

export default class Queue implements StorageForUpdateGameStateFn {
  constructor(
    private readonly _gs$: GameState,
    private readonly _dirQueue$: Direction[],
    private _updateGameStateFn$: UpdateGameState$ = noop,
    private _gsQueue$: GameState[],
    private readonly mover: Mover,
  ) { }

  handle$(d: Direction) {
    if (this._dirQueue$.length) return

    this._dirQueue$.push(d)
    this._process$()
  }

  updateFinished$() {
    this._process$()
  }

  private _process$() {
    const d = this._dirQueue$.shift()
    if (d) {
      this._gsQueue$ = [...this._gsQueue$, ...this.mover.update(this._gs$, d)]
      this._updateGameStateFn$(gs)
    }
  }

  setUpdateGameStateFn$(updateGameStateFn$: UpdateGameState$): void {
    this._updateGameStateFn$ = updateGameStateFn$
  }

}
