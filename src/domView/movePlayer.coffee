module.exports = (oldPos, newPos, playerDiv) ->
  # Either x or y is changed, never both; hence the simple calculation
  distance = Math.abs(newPos.x - oldPos.x) + Math.abs(newPos.y - oldPos.y)
  playerDiv.style.transitionDuration = "#{distance * .04}s"
  playerDiv.style.transform =
    "translate(#{newPos.x * 100}%, #{newPos.y * 100}%)"
  return
