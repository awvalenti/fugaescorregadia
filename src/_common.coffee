i18n = require '/app/i18n'
updateDivTile$ = require '/app/view/updateDivTile$'
setTranslation$ = require '/app/view/setTranslation$'
version = require '/app/version'

makeDomView = require('/app/view/makeDomView') {
  i18n
  updateDivTile$
  setTranslation$
  version
}

BoardResizer = require '/app/util/BoardResizer'
getDynamicStyle = require '/app/util/getDynamicStyle'

applyDomView$ = require('/app/view/applyDomView$') {
  BoardResizer
  getDynamicStyle
}

makeCoreState = require '/app/core/makeCoreState'
readBoardState = require '/app/core/readBoardState'

module.exports = (levelNumber, viewMode) ->
  coreState = makeCoreState levelNumber, readBoardState levelNumber
  domView = makeDomView coreState, levelNumber, viewMode

  rowCount = coreState.boardState.length
  colCount = coreState.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {domView, coreState, readBoardState, colCount}
