import Level from '../Level'
import { INVALID_LEVEL } from './Error'
import LevelParser from './LevelParser'
import LevelValidator from './LevelValidator'

export default class LevelFactory {

  private readonly _parser: LevelParser
  private readonly _validator: LevelValidator

  constructor(parser: LevelParser, validator: LevelValidator) {
    this._parser = parser
    this._validator = validator
  }

  create(levelAsString: string, id = 0): Level {
    const parsed = this._parser.parse(levelAsString)
    if (!this._validator.run(parsed)) throw INVALID_LEVEL
    return new Level(parsed, id)
  }

}
