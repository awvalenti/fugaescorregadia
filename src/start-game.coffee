{coreModel, domView, updateDomView$, loadLevelModel} =
  require('/_common') 1, 'GAME'

updateCoreModel = require('/prod/mvc/model/updateCoreModel') {
  loadLevelModel
  makeCoreModel: require '/prod/mvc/model/makeCoreModel'
}

updateAppState$ = require('/prod/mvc/updateAppState$') {
  ProcessingQueue: require '/prod/mvc/view/ProcessingQueue'
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
