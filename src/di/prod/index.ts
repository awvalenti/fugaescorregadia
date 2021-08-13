import UseController from '../../components/hooks/UseController'
import GameState from '../../domain/GameState'
import LevelRepo from '../../domain/level/LevelRepo'
import LevelFactory from '../../domain/level/private/LevelFactory'
import LevelFileReader from '../../domain/level/private/LevelFileReader'
import LevelParser from '../../domain/level/private/LevelParser'
import LevelValidator from '../../domain/level/private/LevelValidator'
import Controller, { UpdateFinishedListener } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'
import KeyDownListener from '../../infra/KeyDownListener'
import KeyMapper from '../../infra/KeyMapper'

const

  levelRepo = new LevelRepo(
    new LevelFileReader(),
    new LevelFactory(
      new LevelParser(),
      new LevelValidator()
    )
  ),

  gameStateFactory = {
    new: () => new GameState(levelRepo.get(1)),
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
