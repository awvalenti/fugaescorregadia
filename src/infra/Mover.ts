import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import { GOAL } from '../domain/TileId'
import LevelRepo from '../domain/level/LevelRepo'

export class Mover {

  constructor(private _levelRepo: LevelRepo) { }

  update(gs0: GameState, d: Direction): GameState[] {
    const gs1 = gs0.movePlayer(d)
    return (
      gs1 === gs0
        ? []
        : gs1.level.get(gs1.playerPos) === GOAL
          ? [gs1, new GameState(this._levelRepo.get(gs1.level.id + 1))]
          : [gs1]
    )
  }

}
