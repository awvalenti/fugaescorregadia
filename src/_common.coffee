makeCoreModel = require '/app/core/makeCoreModel'

makeLevelModel = require '/app/core/makeLevelModel'
loadLevelModel = require('/app/core/loadLevelModel') {
  makeLevelModel
}

makeDomView = require('/app/view/makeDomView')
  i18n: require '/app/view/i18n'
  updateDivTile$: require '/app/view/updateDivTile$'
  setTranslation$: require '/app/view/setTranslation$'
  version: require '/app/version'

getDynamicStyle = require '/app/view/getDynamicStyle'

applyDomView$ = require('/app/view/applyDomView$') {
  BoardResizer: require('/app/view/BoardResizer') {
    getDynamicStyle
  }
  getDynamicStyle
}

module.exports = (levelNumber, viewMode) ->
  coreModel = makeCoreModel levelNumber, loadLevelModel levelNumber
  domView = makeDomView coreModel, levelNumber, viewMode

  rowCount = coreModel.boardState.length
  colCount = coreModel.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {coreModel, domView, colCount, makeLevelModel, loadLevelModel}
