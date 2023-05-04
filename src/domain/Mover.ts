import Direction from './Direction'
import GameState from './GameState'
import { GOAL } from './TileId'
import LevelRepo from './level/LevelRepo'

export class Mover {

  constructor(private _levelRepo: LevelRepo) { }

  update(gameState: GameState, direction: Direction) {
    const gs0 = gameState.movePlayer(direction)
    return gs0.level.get(gs0.playerPos) === GOAL
      ? new GameState(this._levelRepo.get(gs0.level.id + 1))
      : gs0
  }

}
