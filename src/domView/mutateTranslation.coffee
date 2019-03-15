module.exports = (rowCount, colCount, pos, element) ->
  element.style.top = "#{pos.row * 100 / rowCount}%";
  element.style.left = "#{pos.col * 100 / colCount}%";
  return
