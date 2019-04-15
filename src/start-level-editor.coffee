{domView, colCount, updateDomView$, updateDivTile$, makeLevelModel} =
  require('/_common') 0, 'LEVEL_EDITOR'

require('/app/controller/applyLevelEditorController$') {
  makeLevelModel
  updateDomView$
  makeCoreModel: require '/app/core/makeCoreModel'
  updateDivTile$
  myStorage: require('/app/util/myStorage') {
    version: require '/app/version'
  }
  domView
  colCount
}
