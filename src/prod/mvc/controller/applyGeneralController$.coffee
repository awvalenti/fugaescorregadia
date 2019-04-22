oldController = null

module.exports = (controller) ->
  for name, oldListener of oldController
    document.removeEventListener name, oldListener

  document.addEventListener event, controller[event] for event in [
    'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend']

  oldController = controller

  return
