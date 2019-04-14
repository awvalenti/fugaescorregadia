i18n = require '/i18n'
makeCoreState = require '/app/core/makeCoreState'
readBoardState = require '/app/core/readBoardState'
makeDomView = require('/domView/makeDomView') i18n
applyDomView$ = require '/domView/applyDomView$'

module.exports = (levelNumber) ->
  coreState = makeCoreState levelNumber, readBoardState levelNumber
  domView = makeDomView coreState, levelNumber

  rowCount = coreState.boardState.length
  colCount = coreState.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {domView, coreState, readBoardState, colCount}
