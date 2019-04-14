setTranslation$ = require '/domView/setTranslation$'

MILLISECONDS_PER_TILE = 40

module.exports = (oldPos, newPos, arrivalHandler, playerDiv) ->
  return do Promise.resolve if newPos == oldPos

  new Promise (resolve) ->
    arrivalHandler.resolve = resolve

    # Either row or col is changed, never both; a simple sum will do
    dist = Math.abs(newPos.row - oldPos.row) +
      Math.abs(newPos.col - oldPos.col)

    st = playerDiv.style
    st.transitionDuration = st.webkitTransitionDuration =
      dist * MILLISECONDS_PER_TILE + 'ms'

    setTranslation$ newPos, playerDiv

    return
