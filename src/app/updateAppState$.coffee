require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

updateDomView$ = require '/domView/updateDomView$'

MAX_ENQUEUED_MOVES = 2

class ProcessingQueue
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

module.exports = (gameModel, updateGameModel, domView) ->
  queue = new ProcessingQueue MAX_ENQUEUED_MOVES

  (direction) ->
    queue.add$ ->
      changeset = calculateGameModelChanges gameModel, direction
      gameModel = updateGameModel gameModel, changeset
      await updateDomView$ gameModel, domView, changeset
      if changeset.newLevel?
        'CANCEL_NEXT_TASKS'
      else
        'GO_ON'
    return
