makeCoreModel = require '/prod/mvc/model/makeCoreModel'

makeLevelModel = require '/prod/mvc/model/makeLevelModel'
loadLevelModel = require('/prod/mvc/model/loadLevelModel') {
  makeLevelModel
}

updateDivTile$ = require '/prod/mvc/view/updateDivTile$'
setTranslation$ = require '/prod/mvc/view/setTranslation$'

makeDomView = require('/prod/mvc/view/makeDomView') {
  i18n: require '/prod/mvc/view/i18n'
  updateDivTile$
  setTranslation$
  version: require '/prod/app/version'
}

makeMoveEndListener = require '/prod/mvc/view/makeMoveEndListener'

getDynamicStyle = require '/prod/mvc/view/getDynamicStyle'

applyDomView$ = require('/prod/mvc/view/applyDomView$') {
  BoardResizer: require('/prod/mvc/view/BoardResizer') {
    getDynamicStyle
  }
  getDynamicStyle
}

moveEndListener = do makeMoveEndListener

updateDomView$ = require('/prod/mvc/view/updateDomView$') {
  setPlayerDivPosition$: require('/prod/mvc/view/setPlayerDivPosition$') {
    setTranslation$
  }
  updateDivTile$
  setTranslation$
  moveEndListener
}

module.exports = (levelNumber, viewMode) ->
  coreModel = makeCoreModel levelNumber, loadLevelModel levelNumber
  domView = makeDomView coreModel, levelNumber, viewMode, moveEndListener

  rowCount = coreModel.levelModel.length
  colCount = coreModel.levelModel[0].length

  applyDomView$ rowCount, colCount, domView

  {coreModel, domView, updateDomView$, updateDivTile$,
    colCount, makeLevelModel, loadLevelModel}
