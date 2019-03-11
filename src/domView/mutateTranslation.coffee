module.exports = (pos, element) ->
  element.style.transform = "translate(#{pos.col * 100}%, #{pos.row * 100}%)"
