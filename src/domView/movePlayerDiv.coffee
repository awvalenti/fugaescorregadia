setPlayerDivTranslation = require '/domView/setPlayerDivTranslation'

module.exports = (oldPos, newPos, playerDiv) ->
  return if newPos == oldPos

  # Either row or col is changed, never both; hence the simple calculation
  distance = Math.abs(newPos.row - oldPos.row) +
    Math.abs(newPos.col - oldPos.col)

  playerDiv.style.transitionDuration = "#{distance * .04}s"

  setPlayerDivTranslation newPos, playerDiv

  return
