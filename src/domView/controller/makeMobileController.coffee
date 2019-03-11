module.exports = (mutateAppState) ->
  SENSITIVITY = 30

  touchStartX = touchStartY = null

  touchstart: (e) ->
    e.preventDefault()
    {pageX, pageY} = e.touches[0]
    touchStartX = pageX
    touchStartY = pageY

  touchmove: (e) ->
    e.preventDefault()
    {pageX, pageY} = e.touches[0]

    difX = pageX - touchStartX
    difY = pageY - touchStartY

    absDifX = Math.abs difX
    absDifY = Math.abs difY

    if Math.max(absDifX, absDifY) >= SENSITIVITY
      touchStartX = pageX
      touchStartY = pageY
      mutateAppState(
        if absDifX > absDifY
          if difX < 0 then 'LEFT' else 'RIGHT'
        else
          if difY < 0 then 'UP' else 'DOWN'
      )
