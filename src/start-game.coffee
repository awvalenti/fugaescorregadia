{domView, coreState, readBoardState} = require('/_common') 1

domView.boardDiv.classList.add 'game'

updateCoreState = require('/app/core/updateCoreState') readBoardState

updateAppState$ = require('/app/updateAppState$') coreState, updateCoreState,
  domView

keyboardController =
  require('/domView/controller/makeKeyboardController') updateAppState$

mobileController =
  require('/domView/controller/makeMobileController') updateAppState$

require('/domView/applyGeneralController$') {...keyboardController,
  ...mobileController}
