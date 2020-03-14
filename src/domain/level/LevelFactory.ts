import { INVALID_LEVEL } from './Error'
import LevelModel from './LevelModel'
import LevelParser from './LevelParser'
import LevelValidator from './LevelValidator'

export default class LevelFactory {
  private _parser: LevelParser
  private _validator: LevelValidator

  constructor(parser: LevelParser, validator: LevelValidator) {
    this._parser = parser
    this._validator = validator
  }

  create(levelAsString: string): LevelModel {
    const parsed = this._parser.parse(levelAsString)
    if (!this._validator.run(parsed)) throw INVALID_LEVEL
    return new LevelModel(parsed)
  }
}
