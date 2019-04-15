require 'babel-polyfill' # Necessary for await

MAX_ENQUEUED_MOVES = 2

module.exports = ({
  ProcessingQueue
  deltaCoreModel
  updateDomView$
  coreModel
  updateCoreModel
  domView
}) ->
  queue = new ProcessingQueue MAX_ENQUEUED_MOVES

  (direction) ->
    queue.add$ ->
      delta = deltaCoreModel coreModel, direction
      coreModel = updateCoreModel coreModel, delta
      await updateDomView$ coreModel, domView, delta
      if delta.newLevelNumber? then 'CANCEL_NEXT_TASKS' else 'GO_ON'
    return
