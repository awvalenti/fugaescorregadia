module.exports = (controller) ->
  document.addEventListener event, controller[event] for event in [
    'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend']
  return
