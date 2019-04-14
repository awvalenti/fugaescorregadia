i18n = require '/i18n'
makeGameModel = require '/model/makeGameModel'
readBoardModel = require '/model/readBoardModel'
makeDomView = require('/domView/makeDomView') i18n
applyDomView$ = require '/domView/applyDomView$'

module.exports = (levelNumber) ->
  gameModel = makeGameModel levelNumber, readBoardModel levelNumber
  domView = makeDomView gameModel, levelNumber

  rowCount = gameModel.boardModel.length
  colCount = gameModel.boardModel[0].length

  applyDomView$ rowCount, colCount, domView

  {domView, gameModel, readBoardModel, colCount}
