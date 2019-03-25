pointedTileDiv = null
lastTileName = null

trySetTile = ->
  if pointedTileDiv? and lastTileName?
    require('/domView/mutateDivTile') lastTileName, pointedTileDiv

mouseenter = (tileDiv) ->
  pointedTileDiv = tileDiv
  do trySetTile

mouseleave = ->
  pointedTileDiv = null

keydown = (e) ->
  lastTileName =
    switch e.key
      when '0' then 'EMPTY'
      when '1' then 'START'
      when '2' then 'OBSTACLE'
  do trySetTile

keyup = (e) ->
  lastTileName = null

module.exports = ({boardDiv, playerDiv}) ->
  boardDiv.removeChild playerDiv

  for tileDiv in boardDiv.childNodes
    tileDiv.onmouseenter = mouseenter.bind null, tileDiv

  boardDiv.onmouseleave = mouseleave

  window.onkeydown = keydown
  window.onkeyup = keyup
