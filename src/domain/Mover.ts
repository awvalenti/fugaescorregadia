import Direction from './Direction'
import GameState from './GameState'
import Position from './Position'
import { GOAL, ILLEGAL_GAME_STATE } from './Tile'
import LevelRepo from './level/LevelRepo'

export class Mover {

  constructor(private _levelRepo: LevelRepo) { }

  update(gameState: GameState, direction: Direction) {
    // debugger
    const gs1 = this.movePlayer(gameState, direction)
    return gs1.level.get(gs1.playerPos) === GOAL
      ? new GameState(this._levelRepo.get(gs1.level.id + 1))
      : gs1
  }

  private movePlayer(gameState: GameState, direction: Direction): GameState {
    const newPos = this._move(gameState, gameState.playerPos, direction)
    return new GameState(gameState.level, newPos)

    // TODO: eliminate need for anticipateUpdateFinishedIfNecessary
    // by checking if gameState is same as last one. If it is, call
    // updateFinished$.
    //
    // Hm, maybe can't do this. export class IncreasingLevelState extends AppState {
    // override onAddMove(): Transition {
    //   return this
    // This would break.
    //
    // return newPos.equals(this.playerPos)
    //   ? this
    //   : new GameState(this.level, newPos)
  }

  private _move(gameState: GameState, oldPos: Position, direction: Direction): Position {
    const newPos = oldPos.add(direction)
    switch (gameState.level.get(newPos).before()) {
      case 'STOP_BEFORE': return oldPos
      case 'ADVANCE_LEVEL': throw ILLEGAL_GAME_STATE
      case 'KEEP_MOVING':
        switch (gameState.level.get(newPos).during()) {
          case 'KEEP_MOVING':
            return this._move(gameState, newPos, direction)

          case 'STOP_BEFORE':
          case 'ADVANCE_LEVEL':
            return newPos
        }
    }
  }

}
