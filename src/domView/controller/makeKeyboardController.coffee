module.exports = (mutateAppState) ->
  pressedKeys = {}

  keydown: (e) ->
    {key} = e
    return if key of pressedKeys
    pressedKeys[key] = true
    switch key
      when 'ArrowUp'    then mutateAppState 'UP'
      when 'ArrowRight' then mutateAppState 'RIGHT'
      when 'ArrowDown'  then mutateAppState 'DOWN'
      when 'ArrowLeft'  then mutateAppState 'LEFT'

  keyup: (e) ->
    delete pressedKeys[e.key]
