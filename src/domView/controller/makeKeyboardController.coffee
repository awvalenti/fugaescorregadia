module.exports = (mutateAppState) ->
  pressedKeys = new Set

  keydown: ({key}) ->
    return if pressedKeys.has key
    pressedKeys.add key
    switch key
      when 'ArrowUp'    then mutateAppState 'UP'
      when 'ArrowRight' then mutateAppState 'RIGHT'
      when 'ArrowDown'  then mutateAppState 'DOWN'
      when 'ArrowLeft'  then mutateAppState 'LEFT'
    return

  keyup: ({key}) ->
    pressedKeys.delete key
    return
