mutateTranslation = require '/domView/mutateTranslation'

module.exports = () ->
  MILLISECONDS_PER_TILE = 40

  oldResolve = null

  (oldPos, newPos, playerDiv) ->
    return Promise.resolve() if newPos == oldPos

    new Promise (resolve) ->
      playerDiv.removeEventListener 'webkitTransitionEnd', oldResolve
      playerDiv.removeEventListener 'transitionend', oldResolve

      playerDiv.addEventListener 'webkitTransitionEnd', resolve
      playerDiv.addEventListener 'transitionend', resolve

      oldResolve = resolve

      # Either row or col is changed, never both; a simple sum will do
      dist = Math.abs(newPos.row - oldPos.row) +
        Math.abs(newPos.col - oldPos.col)

      st = playerDiv.style
      st.transitionDuration = st['-webkit-transition-duration'] =
        "#{dist * MILLISECONDS_PER_TILE}ms"

      mutateTranslation newPos, playerDiv

      return
