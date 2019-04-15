# Fixes https://github.com/awvalenti/fugaescorregadia/issues/3.
# WebKit seems to have a bug with transform/translate in percentage
# (see https://bugs.chromium.org/p/chromium/issues/detail?id=947843).
# Checking userAgent is not very reliable. But, in this case,
# there's no other way.
agent = navigator.userAgent
isWebKit = /WebKit/.test(agent) and not /Edge/.test agent
isSafari = /^((?!chrome|android).)*safari/i.test agent
needsEvenDimension = isWebKit and not isSafari

module.exports = ({
  getDynamicStyle
}) ->
  immediateResize$ = (rowCount, colCount) ->
    height = window.innerHeight

    # https://github.com/awvalenti/fugaescorregadia/issues/27
    ++height if window.outerHeight is height + 1

    tileDimension = Math.min Math.floor(window.innerWidth / colCount),
      Math.floor height / rowCount

    --tileDimension if needsEvenDimension and tileDimension % 2 is 1

    boardStyle = getDynamicStyle '.board'
    boardStyle.width = tileDimension * colCount + 'px'
    boardStyle.height = tileDimension * rowCount + 'px'

  initialResize$ = (rowCount, colCount) ->
    if window.innerWidth > 0 and window.innerHeight > 0
      immediateResize$ rowCount, colCount
    else
      setTimeout initialResize$, 10, rowCount, colCount

  throttledResize$ = (rowCount, colCount) ->
    # https://developer.mozilla.org/en-US/docs/Web/Events/resize
    # provides a good explanation of why we should do this.
    # Following code was translated to JavaScript and posted
    # on the address above.
    resizeTaskId = null
    ->
      clearTimeout resizeTaskId if resizeTaskId?
      resizeTaskId = setTimeout (->
          resizeTaskId = null
          immediateResize$ rowCount, colCount
        ), 50

  {initialResize$, throttledResize$}
