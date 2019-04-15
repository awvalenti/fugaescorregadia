MILLISECONDS_PER_TILE = 40

module.exports = ({
  setTranslation$
}) ->
  (oldPos, newPos, moveEndListener, playerDiv) ->
    return do Promise.resolve if newPos == oldPos

    new Promise (resolve) ->
      moveEndListener.resolve = resolve

      # Either row or col is changed, never both; a simple sum will do
      dist = Math.abs(newPos.row - oldPos.row) +
        Math.abs(newPos.col - oldPos.col)

      st = playerDiv.style
      st.transitionDuration = st.webkitTransitionDuration =
        dist * MILLISECONDS_PER_TILE + 'ms'

      setTranslation$ newPos, playerDiv

      return
