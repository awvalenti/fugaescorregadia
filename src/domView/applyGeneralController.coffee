module.exports = (controller) ->
  window['on' + event] = controller[event] for event in [
    'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend']
  return
