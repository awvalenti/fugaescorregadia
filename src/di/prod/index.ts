import UseController from '../../components/hooks/UseController'
import { AppState } from '../../domain/AppState'
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
import { Mover } from '../../infra/Mover'

const

  levelRepo = new LevelRepo(
    new LevelFileReader(),
    new LevelFactory(
      new LevelParser(),
      new LevelValidator()
    )
  ),

  gameState = new GameState(levelRepo.get(1)),

  appState = new AppState([], new Mover(levelRepo)),

  controller = new Controller(gameState, appState),

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
