/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import Direction from './Direction'
import Level from './level/Level'
import LevelRepo from './level/LevelRepo'
import LevelFactory from './level/private/LevelFactory'
import LevelFileReader from './level/private/LevelFileReader'
import LevelParser from './level/private/LevelParser'
import LevelValidator from './level/private/LevelValidator'
import Position from './Position'
import { GOAL, OBSTACLE } from './TileId'

export abstract class GameState {

  readonly level: Level
  readonly playerPos: Position

  constructor(level: Level, playerPos: Position = level.playerPos) {
    this.level = level
    this.playerPos = playerPos
  }

  protected _move(direction: Direction): Position {
    for (let oldPos = this.playerPos, newPos; ;) {
      newPos = oldPos.add(direction)

      if (!newPos.isInside(this.level)) return oldPos

      switch (this.level.background[newPos.row][newPos.col]) {
        case OBSTACLE: return oldPos
        case GOAL: return newPos
        default: oldPos = newPos
      }
    }
  }

  abstract movePlayer(direction: Direction): GameState

  abstract next(): GameState

}

export class StillGameState extends GameState {

  override next(): GameState {
    return this
  }

  override movePlayer(direction: Direction): GameState {
    const newPos = this._move(direction)
    return newPos.equals(this.playerPos) ? this : new MovingGameState(this.level, newPos)
  }

}

const lf = new LevelFactory(new LevelParser(), new LevelValidator())
const lr = new LevelRepo(new LevelFileReader(), lf)

export class ChangingLevelGameState extends GameState {

  override movePlayer(): GameState {
    // console.log('bla')

    return this
  }

  override next(): GameState {
    // debugger
    return new StillGameState(lr.get(this.level.id + 1))
  }

}

export class MovingGameState extends GameState {

  override movePlayer(direction: Direction): GameState {
    const newPos = this._move(direction)
    return newPos.equals(this.playerPos) ? new StillGameState(this.level, this.playerPos) : new MovingGameState(this.level, newPos)
  }

  override next(): GameState {
    return this.level.background[this.playerPos.row][this.playerPos.col] ===
      GOAL ? new ChangingLevelGameState(this.level, this.playerPos) : new StillGameState(this.level, this.playerPos)
  }

}
