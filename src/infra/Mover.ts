import Direction from '../domain/Direction'
import GameState from '../domain/GameState'
import { GOAL } from '../domain/TileId'
import LevelRepo from '../domain/level/LevelRepo'

export class Mover {

  constructor(private _levelRepo: LevelRepo) { }

  update(gameState: GameState, direction: Direction): GameState[] {
    const ret: GameState[] = []
    const gs0 = gameState.movePlayer(direction)
    ret.push(gs0)
    if (gs0.level.get(gs0.playerPos) === GOAL) {
      ret.push(new GameState(this._levelRepo.get(gs0.level.id + 1)))
    }
    return ret
  }

}
