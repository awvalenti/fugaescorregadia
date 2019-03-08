module.exports = (oldPos, newPos, playerDiv) ->
  np = newPos

  # Either row or col is changed, never both; hence the simple calculation
  distance = Math.abs(np.row - oldPos.row) + Math.abs(np.col - oldPos.col)

  playerDiv.style.transitionDuration = "#{distance * .04}s"
  playerDiv.style.transform = "translate(#{np.col * 100}%, #{np.row * 100}%)"

  return
