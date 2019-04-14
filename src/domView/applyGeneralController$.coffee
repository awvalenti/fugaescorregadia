module.exports = (controller) ->
  document['on' + event] = controller[event] for event in [
    'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend']
  return
