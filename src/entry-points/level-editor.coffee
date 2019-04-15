{domView, colCount, updateDomView$, updateDivTile$, makeLevelModel} =
  require('/entry-points/_common') 0, 'LEVEL_EDITOR'

require('/prod/mvc/controller/applyLevelEditorController$') {
  makeLevelModel
  updateDomView$
  makeCoreModel: require '/prod/mvc/model/makeCoreModel'
  updateDivTile$
  myStorage: require('/prod/infra/myStorage') {
    version: require '/prod/app/version'
  }
  domView
  colCount
}
