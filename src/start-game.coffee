i18n = require('/i18n') 'en'

makeGameModel = require '/model/makeGameModel'
readBoardModel = require '/model/readBoardModel'
updateGameModel = require('/model/updateGameModel') readBoardModel

makeDomView = require('/domView/makeDomView') i18n
makeController = require '/domView/makeController'
mutateDocument = require '/domView/mutateDocument'

gameModel = makeGameModel 0, readBoardModel 0
domView = makeDomView gameModel
controller = makeController updateGameModel, gameModel, domView

mutateDocument document, domView, controller
