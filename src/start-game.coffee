{coreState, domView, readBoardState} = require('/_common') 1, 'GAME'

updateCoreState = require('/app/core/updateCoreState') {
  readBoardState
  makeCoreState: require '/app/core/makeCoreState'
}

updateAppState$ = require('/app/updateAppState$') {
  ProcessingQueue: require '/app/ProcessingQueue'
  deltaCoreState: require '/app/core/deltaCoreState'

  updateDomView$: require('/app/view/updateDomView$') {
    setPlayerDivPosition$: require('/app/view/setPlayerDivPosition$') {
      setTranslation$: require '/app/view/setTranslation$'
    }
    updateDivTile$: require '/app/view/updateDivTile$'
    setTranslation$: require '/app/view/setTranslation$'
  }

  coreState
  updateCoreState
  domView
}

keyboardController =
  require('/app/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/app/controller/makeMobileController') updateAppState$

require('/app/controller/applyGeneralController$') {...keyboardController,
  ...mobileController}
