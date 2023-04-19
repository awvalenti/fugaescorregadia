import { Mover } from '../infra/Mover'
import Direction from './Direction'
import GameState from './GameState'

export class AppState {

  constructor(
    private readonly _queue: Direction[],
    private readonly _mover: Mover,
  ) {
  }

  move(gs: GameState, d: Direction): GameState[] {
    if (this._queue.length > 0) return []

    const gameStates = this._mover.update(gs, d)

    if (gameStates[0] === gs) return []

    return gameStates
  }

}
