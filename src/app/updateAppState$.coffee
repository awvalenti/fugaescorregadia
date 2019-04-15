require 'babel-polyfill' # Necessary for await

MAX_ENQUEUED_MOVES = 2

module.exports = ({
  ProcessingQueue
  deltaCoreState
  updateDomView$
  coreState
  updateCoreState
  domView
}) ->
  queue = new ProcessingQueue MAX_ENQUEUED_MOVES

  (direction) ->
    queue.add$ ->
      delta = deltaCoreState coreState, direction
      coreState = updateCoreState coreState, delta
      await updateDomView$ coreState, domView, delta
      if delta.newLevelNumber? then 'CANCEL_NEXT_TASKS' else 'GO_ON'
    return
