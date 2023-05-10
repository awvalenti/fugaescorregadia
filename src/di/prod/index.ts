import UseController from '../../components/hooks/UseController'
import GameState, { IdleState } from '../../domain/GameState'
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

  gameState = new GameState(levelRepo, levelRepo.get(1)),

  appState = new IdleState(gameState),

  controller = new Controller(appState),

  keyboardHandler = new KeyboardHandler(
    document,
    new KeyDownListener(new KeyMapper(), controller),
  ),

  useController = new UseController(controller, keyboardHandler),

  updateFinishedListener: UpdateFinishedListener = controller

export default {
  gameState,
  useController,
  updateFinishedListener,
}
