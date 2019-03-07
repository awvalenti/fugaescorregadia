i18n             = (require '/i18n') 'en'

readBoardModel   = require '/model/readBoardModel'
makeGameModel    = require '/model/makeGameModel'

makeDomViewModel = (require '/domView/makeDomViewModel') i18n
applyView        = require '/domView/applyView'
makeController   = require '/domView/makeController'

boardModel   = readBoardModel 0
gameModel    = makeGameModel boardModel
domViewModel = makeDomViewModel gameModel
controller   = makeController gameModel, domViewModel

applyView domViewModel, controller
