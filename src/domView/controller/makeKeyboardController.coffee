keyNameFor = (keyCode) ->
  switch keyCode
    when 37 then 'ArrowLeft'
    when 38 then 'ArrowUp'
    when 39 then 'ArrowRight'
    when 40 then 'ArrowDown'

    when 87 then 'KeyW'
    when 65 then 'KeyA'
    when 83 then 'KeyS'
    when 68 then 'KeyD'

    when 72 then 'KeyH'
    when 74 then 'KeyJ'
    when 75 then 'KeyK'
    when 76 then 'KeyL'

directionFor = ({code, keyCode}) ->
  switch code ? keyNameFor keyCode
    when 'ArrowUp',    'KeyW', 'KeyK' then 'UP'
    when 'ArrowLeft',  'KeyA', 'KeyH' then 'LEFT'
    when 'ArrowDown',  'KeyS', 'KeyJ' then 'DOWN'
    when 'ArrowRight', 'KeyD', 'KeyL' then 'RIGHT'

module.exports = (mutateAppState) ->
  pressedKeys = new Set

  keydown: (e) ->
    return if pressedKeys.has e.keyCode

    pressedKeys.add e.keyCode

    if (direction = directionFor e)?
      mutateAppState direction
      do e.preventDefault

    return

  keyup: ({keyCode}) ->
    pressedKeys.delete keyCode
    return
