module.exports = (pos, element) ->
  element.style.transform = element.style.webkitTransform =
    "translate(#{pos.col * 100}%, #{pos.row * 100}%)"
  return
