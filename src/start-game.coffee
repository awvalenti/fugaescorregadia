{domView, gameModel, readBoardModel} = require('/_common') 1

domView.boardDiv.classList.add 'game'

updateGameModel = require('/model/updateGameModel') readBoardModel

setAppState$ = require('/app/setAppState$') gameModel, updateGameModel,
  domView

keyboardController =
  require('/domView/controller/makeKeyboardController') setAppState$

mobileController =
  require('/domView/controller/makeMobileController') setAppState$

require('/domView/applyGeneralController$') {...keyboardController,
  ...mobileController}
