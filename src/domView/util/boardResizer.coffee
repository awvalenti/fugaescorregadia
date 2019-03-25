getDynamicStyle = require '/domView/util/getDynamicStyle'

immediateResize = (rowCount, colCount) ->
  tileDimension = Math.min Math.floor(window.innerWidth / colCount),
    Math.floor(window.innerHeight / rowCount)

  boardStyle = getDynamicStyle '.board'
  boardStyle.width = tileDimension * colCount + 'px'
  boardStyle.height = tileDimension * rowCount + 'px'

initialResize = (rowCount, colCount) ->
  if window.innerWidth > 0 and window.innerHeight > 0
    immediateResize rowCount, colCount
  else
    setTimeout initialResize, 10, rowCount, colCount

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

module.exports = {initialResize, throttledResize}
