mutateDivTile = require '/domView/mutateDivTile'

tileNameFor = (key) ->
  switch key
    when '0', 'Delete', '.', ',' then 'EMPTY'
    when '1' then 'START'
    when '2' then 'OBSTACLE'

module.exports = ({boardDiv, playerDiv}) ->
  pointedTileDiv = null
  pressedKeys = []

  trySetTile = ->
    mutateDivTile tileName, pointedTileDiv if pointedTileDiv? and
      tileName = tileNameFor pressedKeys[pressedKeys.length - 1]

  mouseenter = (tileDiv) ->
    pointedTileDiv = tileDiv
    do trySetTile

  mouseleave = ->
    pointedTileDiv = null

  keydown = ({key}) ->
    pressedKeys.push key unless key in pressedKeys
    do trySetTile

  keyup = ({key}) ->
    pressedKeys.splice (pressedKeys.indexOf key), 1
    do trySetTile

  boardDiv.removeChild playerDiv

  for tileDiv in boardDiv.childNodes
    tileDiv.onmouseenter = mouseenter.bind null, tileDiv

  boardDiv.onmouseleave = mouseleave

  window.onkeydown = keydown
  window.onkeyup = keyup
