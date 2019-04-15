makeDomView = require('/app/view/makeDomView')
  i18n: require '/app/i18n'
  updateDivTile$: require '/app/view/updateDivTile$'
  setTranslation$: require '/app/view/setTranslation$'
  version: require '/app/version'

applyDomView$ = require('/app/view/applyDomView$')
  BoardResizer: require '/app/util/BoardResizer'
  getDynamicStyle: require '/app/util/getDynamicStyle'

makeCoreState = require '/app/core/makeCoreState'
makeLevelModel = require '/app/core/makeLevelModel'

module.exports = (levelNumber, viewMode) ->
  coreState = makeCoreState levelNumber, makeLevelModel levelNumber
  domView = makeDomView coreState, levelNumber, viewMode

  rowCount = coreState.boardState.length
  colCount = coreState.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {coreState, domView, makeLevelModel, colCount}
