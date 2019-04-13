DIRECTION_FOR =
  37: 'LEFT'
  38: 'UP'
  39: 'RIGHT'
  40: 'DOWN'

module.exports = (mutateAppState) ->
  pressedKeys = new Set

  keydown: (e) ->
    {keyCode} = e

    return if pressedKeys.has keyCode

    pressedKeys.add keyCode

    direction = DIRECTION_FOR[keyCode]

    if direction?
      mutateAppState direction
      do e.preventDefault

    return

  keyup: ({keyCode}) ->
    pressedKeys.delete keyCode
    return
