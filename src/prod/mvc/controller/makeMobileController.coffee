# How many pixels long the swipe must be, either horizontally or vertically,
# for a movement attempt to be considered
SWIPE_THRESHOLD = 10

# How many times the x offset must be greater than the y offset
# for the movement to be considered horizontal instead of vertical,
# or vice-versa
ORIENTATION_FACTOR = 3

module.exports = (updateAppState$) ->
  swipeStartX = swipeStartY = lastMoveDirection = null

  setSwipeStart = (x, y) ->
    swipeStartX = x
    swipeStartY = y
    return

  touchstart: (e) ->
    # Mobile Safari 6.0: prevents scrolling
    # Mobile Firefox: prevents vibration if touch is held
    do e.preventDefault unless e.target.tagName is 'A'

    {pageX, pageY} = e.touches[0]
    setSwipeStart pageX, pageY
    return

  touchend: ->
    lastMoveDirection = null
    return

  touchmove: (e) ->
    {pageX, pageY} = e.touches[0]

    offsetX = pageX - swipeStartX
    offsetY = pageY - swipeStartY
    absOffsetX = Math.abs offsetX
    absOffsetY = Math.abs offsetY

    swipingContinuously = lastMoveDirection is
      if absOffsetX > absOffsetY
        if offsetX < 0 then 'LEFT' else 'RIGHT'
      else
        if offsetY < 0 then 'UP' else 'DOWN'

    if swipingContinuously
      setSwipeStart pageX, pageY
      return

    if absOffsetX >= SWIPE_THRESHOLD or absOffsetY >= SWIPE_THRESHOLD
      setSwipeStart pageX, pageY

      newDirection =
        if absOffsetX > ORIENTATION_FACTOR * absOffsetY
          if offsetX < 0 then 'LEFT' else 'RIGHT'
        else if absOffsetY > ORIENTATION_FACTOR * absOffsetX
          if offsetY < 0 then 'UP' else 'DOWN'
        else
          null

      if newDirection?
        lastMoveDirection = newDirection
        updateAppState$ newDirection
    return
