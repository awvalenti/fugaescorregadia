i18n = require '/i18n'
makeGameModel = require '/model/makeGameModel'
readBoardModel = require '/model/readBoardModel'
makeDomView = require('/domView/makeDomView') i18n
applyDomView = require '/domView/applyDomView'

module.exports = (level) ->
  gameModel = makeGameModel level, readBoardModel level
  domView = makeDomView gameModel

  applyDomView gameModel.boardModel.length, gameModel.boardModel[0].length,
    domView

  {domView, gameModel, readBoardModel}
