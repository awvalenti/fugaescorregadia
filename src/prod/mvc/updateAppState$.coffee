require 'babel-polyfill' # Necessary for await

MAX_SEQUENTIAL_MOVES = 3

module.exports = ({
  deltaCoreModel
  updateDomView$
  coreModel
  updateCoreModel
  domView
}) ->

  moves$ = []
  coreModel$ = coreModel

  startProcessing = ->
    loop
      direction = moves$[0]
      delta = deltaCoreModel coreModel$, direction
      coreModel$ = updateCoreModel coreModel$, delta
      await updateDomView$ coreModel$, domView, delta
      do moves$.shift
      return if moves$.length is 0 or delta.newLevelNumber?

  (direction) ->
    if moves$.length < MAX_SEQUENTIAL_MOVES
      moves$.push direction
      if moves$.length is 1 then do startProcessing
    return
