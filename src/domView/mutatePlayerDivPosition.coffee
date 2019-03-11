mutateTranslation = require '/domView/mutateTranslation'

module.exports = (oldPos, newPos, playerDiv) ->
  return Promise.resolve() if newPos == oldPos

  new Promise (resolve, reject) ->
    # Either row or col is changed, never both; hence the simple calculation
    dist = Math.abs(newPos.row - oldPos.row) + Math.abs(newPos.col - oldPos.col)

    # Animation speed is always the same:
    # duration is adjusted according to distance
    st = playerDiv.style
    st.transitionDuration = st['-webkit-transition-duration'] = "#{dist * 40}ms"

    transitionend = -> resolve()

    playerDiv.addEventListener 'webkitTransitionEnd', transitionend
    playerDiv.addEventListener 'transitionend', transitionend

    mutateTranslation newPos, playerDiv

    return
