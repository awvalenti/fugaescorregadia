import LevelModel from './LevelModel'
import LevelFactory from './private/LevelFactory'
import LevelLoader from './private/LevelLoader'

export default class LevelRepo {
  private _levelLoader: LevelLoader
  private _levelFactory: LevelFactory

  constructor(levelLoader: LevelLoader, levelFactory: LevelFactory) {
    this._levelLoader = levelLoader
    this._levelFactory = levelFactory
  }

  get(levelId: number): LevelModel {
    return this._levelFactory.create(this._levelLoader.read(String(levelId)))
  }

}
