keydown = touchstart = touchmove = null

module.exports = (document, domView, keyboardController, mobileController) ->
  document.title = domView.title

  document.body.appendChild domView.boardDiv

  # Removes old listeners between ParcelJS reloads
  document.removeEventListener 'keydown', keydown
  document.removeEventListener 'touchstart', touchstart
  document.removeEventListener 'touchmove', touchmove

  {keydown} = keyboardController
  {touchstart, touchmove} = mobileController

  document.addEventListener 'keydown', keydown
  document.addEventListener 'touchstart', touchstart, passive: false
  document.addEventListener 'touchmove', touchmove, passive: false

  return
