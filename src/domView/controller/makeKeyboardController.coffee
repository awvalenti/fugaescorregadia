module.exports = (mutateAppState) ->
  keydown: (e) ->
    switch e.key
      when 'ArrowUp'    then mutateAppState 'UP'
      when 'ArrowRight' then mutateAppState 'RIGHT'
      when 'ArrowDown'  then mutateAppState 'DOWN'
      when 'ArrowLeft'  then mutateAppState 'LEFT'