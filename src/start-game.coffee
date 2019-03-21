i18n = require '/i18n'
makeGameModel = require '/model/makeGameModel'
readBoardModel = require '/model/readBoardModel'
updateGameModel = require('/model/updateGameModel') readBoardModel
makeDomView = require('/domView/makeDomView') i18n
makeKeyboardController = require '/domView/controller/makeKeyboardController'
makeMobileController = require '/domView/controller/makeMobileController'
mutateDocument = require '/domView/mutateDocument'

gameModel = makeGameModel 0, readBoardModel 0
domView = makeDomView gameModel

mutateAppState = require('/app/mutateAppState') gameModel, updateGameModel,
  domView

keyboardController = makeKeyboardController mutateAppState
mobileController = makeMobileController mutateAppState

mutateDocument gameModel.boardModel.length, gameModel.boardModel[0].length,
  domView, keyboardController, mobileController
