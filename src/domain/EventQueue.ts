import { Mover } from '../infra/Mover'
import Direction from './Direction'
import GameState from './GameState'

export class EventQueue {

  constructor(
    private readonly _queue: Direction[] = [],
    private readonly _mover: Mover
  ) { }

  handle(d: Direction): [EventQueue, GameState[]] {
    // return this._queue.length > 0 ? [this, []] : [new EventQueue([d]), this._mover.update()]
  }

}
