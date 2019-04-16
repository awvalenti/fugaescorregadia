{coreModel, domView, updateDomView$, loadLevelModel} =
  require('/entry-points/_common') 1, 'GAME'

makeCoreModel = require '/prod/mvc/model/makeCoreModel'

updateCoreModel = require('/prod/mvc/model/updateCoreModel') {
  makeCoreModel
}

updateAppState$ = require('/prod/mvc/updateAppState$') {
  deltaCoreModel: require('/prod/mvc/model/deltaCoreModel') {
    loadLevelModel
    makeCoreModel
  }
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
