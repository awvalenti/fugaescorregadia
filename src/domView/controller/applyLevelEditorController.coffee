mutateDivTile = require '/domView/mutateDivTile'

tileNameForKey = (key) ->
  switch key
    when '0' then 'EMPTY'
    when '1' then 'START'
    when '2' then 'OBSTACLE'

module.exports = ({boardDiv, playerDiv}) ->
  pointedTileDiv = null
  keysPressed = []

  trySetTile = ->
    mutateDivTile tileName, pointedTileDiv if pointedTileDiv? and
      tileName = tileNameForKey keysPressed[keysPressed.length - 1]

  mouseenter = (tileDiv) ->
    pointedTileDiv = tileDiv
    do trySetTile

  mouseleave = ->
    pointedTileDiv = null

  keydown = ({key}) ->
    keysPressed.push key unless key in keysPressed
    do trySetTile

  keyup = ({key}) ->
    keysPressed.splice (keysPressed.indexOf key), 1
    do trySetTile

  boardDiv.removeChild playerDiv

  for tileDiv in boardDiv.childNodes
    tileDiv.onmouseenter = mouseenter.bind null, tileDiv

  boardDiv.onmouseleave = mouseleave

  window.onkeydown = keydown
  window.onkeyup = keyup
