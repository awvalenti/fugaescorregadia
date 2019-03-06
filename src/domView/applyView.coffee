keydownListener = touchstartListener = null

module.exports = (domViewModel, controller) ->
  document.title = domViewModel.title

  document.body.appendChild domViewModel.boardDiv

  # Removes old listeners between ParcelJS reloads
  document.removeEventListener 'keydown', keydownListener
  document.removeEventListener 'touchstart', touchstartListener

  keydownListener = controller.keydown
  touchstartListener = controller.touchstart

  document.addEventListener 'keydown', keydownListener
  document.addEventListener 'touchstart', touchstartListener
