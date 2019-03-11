mutateTranslation = require '/domView/mutateTranslation'

module.exports = (oldPos, newPos, playerDiv) ->
  return Promise.resolve() if newPos == oldPos

  new Promise (resolve, reject) ->
    # Either row or col is changed, never both; hence the simple calculation
    distance = Math.abs(newPos.row - oldPos.row) +
      Math.abs(newPos.col - oldPos.col)

    # Animation speed is always the same:
    # duration is adjusted according to distance
    playerDiv.style.transitionDuration = "#{distance * 40}ms"

    playerDiv.addEventListener 'transitionend', -> resolve()

    mutateTranslation newPos, playerDiv

    return
