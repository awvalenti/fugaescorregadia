keydownListener = touchstartListener = null

module.exports = (document, domView, controller) ->
  document.title = domView.title

  document.body.appendChild domView.boardDiv

  # Removes old listeners between ParcelJS reloads
  document.removeEventListener 'keydown', keydownListener
  document.removeEventListener 'touchstart', touchstartListener

  keydownListener = controller.keydown
  touchstartListener = controller.touchstart

  document.addEventListener 'keydown', keydownListener
  document.addEventListener 'touchstart', touchstartListener

  return
