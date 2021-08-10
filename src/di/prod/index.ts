import UseController from '../../components/hooks/UseController'
import GameState from '../../domain/GameState'
import BoundsChecker from '../../domain/level/BoundsChecker'
import LevelRepo from '../../domain/level/LevelRepo'
import LevelFactory from '../../domain/level/private/LevelFactory'
import LevelLoader from '../../domain/level/private/LevelLoader'
import LevelParser from '../../domain/level/private/LevelParser'
import LevelValidator from '../../domain/level/private/LevelValidator'
import Mover from '../../domain/Mover'
import Controller, { UpdateFinishedListener } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'
import KeyDownListener from '../../infra/KeyDownListener'
import KeyMapper from '../../infra/KeyMapper'

const

  levelRepo = new LevelRepo(
    new LevelLoader(),
    new LevelFactory(
      new LevelParser(),
      new LevelValidator()
    )
  ),

  gameStateFactory = {
    new: () => new GameState(
      levelRepo.get(0),
      new Mover(
        new BoundsChecker()
      )
    ),
  },

  controller = new Controller(),

  keyboardHandler = new KeyboardHandler(
    document,
    new KeyDownListener(new KeyMapper(), controller),
  ),

  useController = new UseController(controller, keyboardHandler),

  updateFinishedListener: UpdateFinishedListener = controller

export default {
  gameStateFactory,
  useController,
  updateFinishedListener,
}
