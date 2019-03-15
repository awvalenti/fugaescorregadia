module.exports = (pos, element) ->
  element.style.top = "#{pos.row * 5}%";
  element.style.left = "#{pos.col * 5}%";
  return
