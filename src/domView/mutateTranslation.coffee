module.exports = (rowCount, colCount, pos, element) ->
  element.style.transform = element.style.webkitTransform =
    "translate(#{pos.col * 100}%, #{pos.row * 100}%)"
  return
