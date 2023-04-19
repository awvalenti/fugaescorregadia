import Level from './Level'
import LevelFactory from './private/LevelFactory'
import LevelFileReader from './private/LevelFileReader'

export default class LevelRepo {

  private readonly _levelFileReader: LevelFileReader
  private readonly _levelFactory: LevelFactory

  constructor(levelFileReader: LevelFileReader, levelFactory: LevelFactory) {
    this._levelFileReader = levelFileReader
    this._levelFactory = levelFactory
  }

  get(levelId: number): Level {
    return this._levelFactory.create(levelId, this._levelFileReader.read(levelId))
  }

}
