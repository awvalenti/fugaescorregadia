makeCoreModel = require '/app/core/makeCoreModel'

makeLevelModel = require '/app/core/makeLevelModel'
loadLevelModel = require('/app/core/loadLevelModel') {
  makeLevelModel
}

updateDivTile$ = require '/app/view/updateDivTile$'
setTranslation$ = require '/app/view/setTranslation$'

makeDomView = require('/app/view/makeDomView') {
  i18n: require '/app/view/i18n'
  updateDivTile$
  setTranslation$
  version: require '/app/version'
}

makeMoveEndListener = require '/app/view/makeMoveEndListener'

getDynamicStyle = require '/app/view/getDynamicStyle'

applyDomView$ = require('/app/view/applyDomView$') {
  BoardResizer: require('/app/view/BoardResizer') {
    getDynamicStyle
  }
  getDynamicStyle
}

moveEndListener = do makeMoveEndListener

updateDomView$ = require('/app/view/updateDomView$') {
  setPlayerDivPosition$: require('/app/view/setPlayerDivPosition$') {
    setTranslation$
  }
  updateDivTile$
  setTranslation$
  moveEndListener
}

module.exports = (levelNumber, viewMode) ->
  coreModel = makeCoreModel levelNumber, loadLevelModel levelNumber
  domView = makeDomView coreModel, levelNumber, viewMode, moveEndListener

  rowCount = coreModel.boardState.length
  colCount = coreModel.boardState[0].length

  applyDomView$ rowCount, colCount, domView

  {coreModel, domView, updateDomView$, updateDivTile$,
    colCount, makeLevelModel, loadLevelModel}
