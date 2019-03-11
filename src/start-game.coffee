i18n           = (require '/i18n') 'en'

readBoardModel = require '/model/readBoardModel'
makeGameModel  = require '/model/makeGameModel'

makeDomView    = (require '/domView/makeDomView') i18n
makeController = (require '/domView/makeController') i18n
mutateDocument = require '/domView/mutateDocument'

boardModel = readBoardModel 0
gameModel  = makeGameModel boardModel
domView    = makeDomView gameModel
controller = makeController gameModel, domView

mutateDocument document, domView, controller
