{coreModel, domView, updateDomView$, loadLevelModel} =
  require('/entry-points/_common') 1, 'GAME'

updateCoreModel = require('/prod/mvc/model/updateCoreModel') {
  loadLevelModel
  makeCoreModel: require '/prod/mvc/model/makeCoreModel'
}

updateAppState$ = require('/prod/mvc/updateAppState$') {
  deltaCoreModel: require '/prod/mvc/model/deltaCoreModel'
  updateDomView$
  coreModel
  updateCoreModel
  domView
}

keyboardController =
  require('/prod/mvc/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/prod/mvc/controller/makeMobileController') updateAppState$

require('/prod/mvc/controller/applyGeneralController$') {...keyboardController,
  ...mobileController}
