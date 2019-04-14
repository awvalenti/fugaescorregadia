require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

updateDomView$ = require '/domView/updateDomView$'

MAX_ENQUEUED_MOVES = 2

class ProcessingQueue
  constructor: (maxSize) ->
    @maxSize = maxSize
    @processing = off
    @tasks = []

  add$: (item) ->
    return if @tasks.length >= @maxSize
    @tasks.push item
    do @_process$ unless @processing
    return

  _process$: ->
    @processing = on
    loop
      currentTask = do @tasks.shift
      result = await do currentTask
      if result is 'CANCEL_NEXT_TASKS'
        @tasks.length = 0
      break if @tasks.length is 0
    @processing = off
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
