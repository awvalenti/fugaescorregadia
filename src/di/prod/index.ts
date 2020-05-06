import LevelRepo from '../../domain/level/LevelRepo'
import LevelFactory from '../../domain/level/private/LevelFactory'
import LevelLoader from '../../domain/level/private/LevelLoader'
import LevelParser from '../../domain/level/private/LevelParser'
import LevelValidator from '../../domain/level/private/LevelValidator'

export default {
  levelRepo: new LevelRepo(
    new LevelLoader(),
    new LevelFactory(new LevelParser(), new LevelValidator())
  ),
}
