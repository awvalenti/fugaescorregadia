i18n           = (require '/i18n') 'en'

makeGameModel  = require '/model/makeGameModel'

makeDomView    = (require '/domView/makeDomView') i18n
makeController = (require '/domView/makeController') i18n
mutateDocument = require '/domView/mutateDocument'

gameModel  = makeGameModel()
domView    = makeDomView gameModel
controller = makeController gameModel, domView

mutateDocument document, domView, controller
