KEY_NAME_FOR =
  37: 'ArrowLeft'
  38: 'ArrowUp'
  39: 'ArrowRight'
  40: 'ArrowDown'

  87: 'KeyW'
  65: 'KeyA'
  83: 'KeyS'
  68: 'KeyD'

  72: 'KeyH'
  74: 'KeyJ'
  75: 'KeyK'
  76: 'KeyL'

directionFor = ({code, keyCode}) ->
  # We prefer event.code because it maps uniformly among different
  # keyboard layouts (Brazilian, American, French, German etc.).
  # When not available (older browsers or Edge), we fall back to
  # event.keyCode.
  switch code ? KEY_NAME_FOR[keyCode]
    when 'ArrowUp',    'KeyW', 'KeyK' then 'UP'
    when 'ArrowLeft',  'KeyA', 'KeyH' then 'LEFT'
    when 'ArrowDown',  'KeyS', 'KeyJ' then 'DOWN'
    when 'ArrowRight', 'KeyD', 'KeyL' then 'RIGHT'

module.exports = (updateAppState$) ->
  pressedKeys = new Set

  keydown: (e) ->
    # Avoids key repeat
    return if pressedKeys.has e.keyCode

    pressedKeys.add e.keyCode

    if (direction = directionFor e)?
      updateAppState$ direction
      do e.preventDefault

    return

  keyup: ({keyCode}) ->
    pressedKeys.delete keyCode
    return
