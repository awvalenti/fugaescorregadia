require 'babel-polyfill' # Necessary for await

ProcessingQueue = require '/app/ProcessingQueue'

calculateGameModelChanges = require '/model/calculateGameModelChanges'

updateDomView$ = require '/domView/updateDomView$'

MAX_ENQUEUED_MOVES = 2

module.exports = (gameModel, updateGameModel, domView) ->
  queue = new ProcessingQueue MAX_ENQUEUED_MOVES

  (direction) ->
    queue.add$ ->
      changeset = calculateGameModelChanges gameModel, direction
      gameModel = updateGameModel gameModel, changeset
      await updateDomView$ gameModel, domView, changeset
      if changeset.newLevel? then 'CANCEL_NEXT_TASKS' else 'GO_ON'
    return
