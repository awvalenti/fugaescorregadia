module.exports = class
  constructor: (maxSize) ->
    @_maxSize = maxSize
    @_processing = off
    @_tasks = []

  add$: (item) ->
    return if @_tasks.length >= @_maxSize
    @_tasks.push item
    do @_process$ unless @_processing
    return

  _process$: ->
    @_processing = on
    loop
      currentTask = do @_tasks.shift
      result = await do currentTask
      if result is 'CANCEL_NEXT_TASKS'
        @_tasks.length = 0
      break if @_tasks.length is 0
    @_processing = off
    return
