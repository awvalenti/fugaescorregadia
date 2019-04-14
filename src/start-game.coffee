{domView, gameModel, readBoardModel} = require('/_common') 1

domView.boardDiv.classList.add 'game'

updateGameModel = require('/model/updateGameModel') readBoardModel

updateAppState$ = require('/app/updateAppState$') gameModel, updateGameModel,
  domView

keyboardController =
  require('/domView/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/domView/controller/makeMobileController') updateAppState$

require('/domView/applyGeneralController$') {...keyboardController,
  ...mobileController}
