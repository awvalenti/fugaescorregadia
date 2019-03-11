mutateTranslation = require '/domView/mutateTranslation'

module.exports = (oldPos, newPos, playerDiv) ->
  return Promise.resolve() if newPos == oldPos

  new Promise (resolve, reject) ->
    # Either row or col is changed, never both; hence the simple calculation
    distance = Math.abs(newPos.row - oldPos.row) +
      Math.abs(newPos.col - oldPos.col)
    playerDiv.style.transitionDuration = "#{distance * .04}s"
    playerDiv.addEventListener 'transitionend', -> resolve()
    mutateTranslation newPos, playerDiv
