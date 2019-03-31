mutateDivTile = require '/domView/mutateDivTile'

tileNameFor = (key) ->
  switch key
    when '0', 'Delete', '.', ',' then 'EMPTY'
    when '1' then 'START'
    when '2' then 'OBSTACLE'

module.exports = ({boardDiv, playerDiv}, colCount) ->
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
    mapping = (tileName) ->
      switch tileName
        when 'EMPTY' then '-'
        when 'GOAL' then 'g'
        when 'OBSTACLE' then 'o'
        when 'START' then 's'
        else throw Error "'#{tileName}' <-- invalid tileName"

    if key is 'F2' then console.log \
      Array::reduce.call boardDiv.childNodes, (ret, tileDiv, i) ->
          ret += mapping tileDiv.classList[1]
          ret += if (i + 1) % colCount is 0 then '\n' else ' '
        , ''

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
