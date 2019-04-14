i18n = require '/app/i18n'
makeCoreState = require '/app/core/makeCoreState'
readBoardState = require '/app/core/readBoardState'
makeDomView = require('/app/view/makeDomView') i18n
applyDomView$ = require '/app/view/applyDomView$'

module.exports = (levelNumber) ->
  coreState = makeCoreState levelNumber, readBoardState levelNumber
  domView = makeDomView coreState, levelNumber

  rowCount = coreState.boardState.length
  colCount = coreState.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {domView, coreState, readBoardState, colCount}
