{domView, coreState, readBoardState} = require('/_common') 1, 'GAME'

updateCoreState = require('/app/core/updateCoreState') readBoardState

updateAppState$ = require('/app/updateAppState$') coreState, updateCoreState,
  domView

keyboardController =
  require('/app/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/app/controller/makeMobileController') updateAppState$

require('/app/controller/applyGeneralController$') {...keyboardController,
  ...mobileController}
