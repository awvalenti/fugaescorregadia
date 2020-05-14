import GameState from '../../domain/GameState'
import BoundsChecker from '../../domain/level/BoundsChecker'
import LevelRepo from '../../domain/level/LevelRepo'
import LevelFactory from '../../domain/level/private/LevelFactory'
import LevelLoader from '../../domain/level/private/LevelLoader'
import LevelParser from '../../domain/level/private/LevelParser'
import LevelValidator from '../../domain/level/private/LevelValidator'
import Mover from '../../domain/Mover'

const di = {

  gameStateFactory: {
    new: () => new GameState(di.levelRepo.get(0), new Mover(
      new BoundsChecker())),
  },

  levelRepo: new LevelRepo(
    new LevelLoader(),
    new LevelFactory(new LevelParser(), new LevelValidator())
  ),

}

export default di
