mutateTranslation = require '/domView/mutateTranslation'

MILLISECONDS_PER_TILE = 40

# TODO Make this a non-factory function. It used to be useful, but now there's
# no dependency injection here anymore.

module.exports = () ->
  (oldPos, newPos, arrivalHandler, playerDiv) ->
    return do Promise.resolve if newPos == oldPos

    new Promise (resolve) ->
      arrivalHandler.resolve = resolve

      # Either row or col is changed, never both; a simple sum will do
      dist = Math.abs(newPos.row - oldPos.row) +
        Math.abs(newPos.col - oldPos.col)

      st = playerDiv.style
      st.transitionDuration = st.webkitTransitionDuration =
        dist * MILLISECONDS_PER_TILE + 'ms'

      mutateTranslation newPos, playerDiv

      return
