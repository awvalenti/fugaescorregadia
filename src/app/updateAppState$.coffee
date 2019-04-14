require 'babel-polyfill' # Necessary for await

ProcessingQueue = require '/app/ProcessingQueue'

deltaCoreState = require '/app/core/deltaCoreState'

updateDomView$ = require '/app/view/updateDomView$'

MAX_ENQUEUED_MOVES = 2

module.exports = (coreState, updateCoreState, domView) ->
  queue = new ProcessingQueue MAX_ENQUEUED_MOVES

  (direction) ->
    queue.add$ ->
      delta = deltaCoreState coreState, direction
      coreState = updateCoreState coreState, delta
      await updateDomView$ coreState, domView, delta
      if delta.newLevel? then 'CANCEL_NEXT_TASKS' else 'GO_ON'
    return
