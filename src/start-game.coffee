{domView, gameModel, readBoardModel} = require('/_common') 1

updateGameModel = require('/model/updateGameModel') readBoardModel

mutateAppState = require('/app/mutateAppState') gameModel, updateGameModel,
  domView

keyboardController =
  require('/domView/controller/makeKeyboardController') mutateAppState

mobileController =
  require('/domView/controller/makeMobileController') mutateAppState

require('/domView/applyGeneralController') {...keyboardController,
  ...mobileController}
