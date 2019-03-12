module.exports = (pos, element) ->
  setAccurately = (width, height) ->
    set "#{pos.col * width}px, #{pos.row * height}px"

  setApproximately = () ->
    set "#{pos.col * 100}%, #{pos.row * 100}%"

  set = (values) ->
    element.style.transform = element.style['-webkit-transform'] =
      "translate(#{values})"

  {width, height} = do element.getBoundingClientRect

  if width > 0 and height > 0
    setAccurately width, height
  else
    do setApproximately
    setTimeout ->
      {width, height} = do element.getBoundingClientRect
      setAccurately width, height
    , 0

  return
