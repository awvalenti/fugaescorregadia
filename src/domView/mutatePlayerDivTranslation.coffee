module.exports = (pos, playerDiv) ->
  playerDiv.style.transform = "translate(#{pos.col * 100}%, #{pos.row * 100}%)"
