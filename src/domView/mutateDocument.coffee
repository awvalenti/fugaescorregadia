getCssStyle = require '/domView/util/getCssStyle'

updateMainElement = ({boardDiv}) ->
  main = document.querySelector 'main'

  while do main.hasChildNodes
    main.removeChild main.lastChild

  main.appendChild boardDiv

updateTileSize = (rowCount, colCount) ->
  st = getCssStyle '.tile'
  st.width = 100 / colCount + '%'
  st.height = 100 / rowCount + '%'

immediateResize = (rowCount, colCount) ->
  tileDimension = Math.min Math.floor(window.innerWidth / colCount),
    Math.floor(window.innerHeight / rowCount)

  boardStyle = getCssStyle '.board'
  boardStyle.width = tileDimension * colCount + 'px'
  boardStyle.height = tileDimension * rowCount + 'px'

throttledResize = (rowCount, colCount) ->
  # https://developer.mozilla.org/en-US/docs/Web/Events/resize
  # provides a good explanation of why we should do this.
  # Following code was translated to JavaScript and posted
  # on the address above.
  resizeTaskId = null
  ->
    clearTimeout resizeTaskId if resizeTaskId?
    resizeTaskId = setTimeout (->
        resizeTaskId = null
        immediateResize rowCount, colCount
      ), 50

module.exports = (rowCount, colCount, domView, {keydown},
  {touchstart, touchmove}) ->

  document.title = domView.title

  updateMainElement domView
  updateTileSize rowCount, colCount
  immediateResize rowCount, colCount

  window.onkeydown = keydown
  window.ontouchstart = touchstart
  window.ontouchmove = touchmove
  window.onresize = throttledResize rowCount, colCount

  return