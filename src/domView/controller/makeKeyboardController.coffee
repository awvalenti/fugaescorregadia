module.exports = (mutateAppState) ->
  pressedKeys = {}

  keydown: ({key}) ->
    return if key of pressedKeys
    pressedKeys[key] = true
    switch key
      when 'ArrowUp'    then mutateAppState 'UP'
      when 'ArrowRight' then mutateAppState 'RIGHT'
      when 'ArrowDown'  then mutateAppState 'DOWN'
      when 'ArrowLeft'  then mutateAppState 'LEFT'

  keyup: ({key}) ->
    delete pressedKeys[key]
