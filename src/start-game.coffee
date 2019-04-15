{coreModel, domView, loadLevelModel} = require('/_common') 1, 'GAME'

updateCoreModel = require('/app/core/updateCoreModel') {
  loadLevelModel
  makeCoreModel: require '/app/core/makeCoreModel'
}

updateAppState$ = require('/app/updateAppState$') {
  ProcessingQueue: require '/app/ProcessingQueue'
  deltaCoreModel: require '/app/core/deltaCoreModel'

  updateDomView$: require('/app/view/updateDomView$') {
    setPlayerDivPosition$: require('/app/view/setPlayerDivPosition$') {
      setTranslation$: require '/app/view/setTranslation$'
    }
    updateDivTile$: require '/app/view/updateDivTile$'
    setTranslation$: require '/app/view/setTranslation$'
  }

  coreModel
  updateCoreModel
  domView
}

keyboardController =
  require('/app/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/app/controller/makeMobileController') updateAppState$

require('/app/controller/applyGeneralController$') {...keyboardController,
  ...mobileController}
