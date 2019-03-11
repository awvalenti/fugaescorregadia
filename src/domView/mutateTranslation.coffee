module.exports = (pos, element) ->
  element.style.transform =
    element.style['-webkit-transform'] = "translate(#{pos.col * 100}%, #{pos.row * 100}%)"
  return
