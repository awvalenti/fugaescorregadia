# TODO Refactor: separate into many files

readBoardModel = require '/model/readBoardModel'
updateDomView$ = require '/domView/updateDomView$'
makeGameModel = require '/model/makeGameModel'
updateDivTile$ = require '/domView/updateDivTile$'
myStorage = require '/domView/util/myStorage'

tileNameFor = (key) ->
  switch key
    when '0', 'Delete', '.', ',' then 'EMPTY'
    when '1' then 'START'
    when '2' then 'GOAL'
    when '3' then 'OBSTACLE'

setUnsaved = () -> document.title = '⚪ Unsaved'
setSaved = () -> document.title = '✔️ Saved'

module.exports = ({boardDiv, playerDiv}, colCount) ->
  pointedTileDiv = null
  pressedKeys = []

  boardDiv.removeChild playerDiv

  save = ->
    mapping = (tileName) ->
      switch tileName
        when 'EMPTY' then '-'
        when 'GOAL' then 'g'
        when 'OBSTACLE' then 'o'
        when 'START' then 's'
        else throw Error "'#{tileName}' <-- invalid tileName"

    myStorage.set 'level', Array::reduce.call boardDiv.childNodes,
      (ret, tileDiv, i) ->
        ret += mapping tileDiv.classList[1]
        ret += if (i + 1) % colCount is 0 then '\n' else ' '
      , ''

    do setSaved

  load = (levelString) ->
    updateDomView$ makeGameModel(0, readBoardModel levelString),
      {boardDiv, playerDiv}, {newLevel: 0}
    do save

  level = myStorage.get 'level'
  load level if level?

  trySetTile = ->
    keys = pressedKeys
    if pointedTileDiv? and tileName = tileNameFor keys[keys.length - 1]
      updateDivTile$ tileName, pointedTileDiv
      do setUnsaved

  mouseenter = (tileDiv) ->
    pointedTileDiv = tileDiv
    do trySetTile

  mouseleave = ->
    pointedTileDiv = null

  keydown = (e) ->
    {key} = e

    if e.ctrlKey
      switch key
        when 's', 'S'
          do e.preventDefault
          do save

        when 'e', 'E'
          do e.preventDefault
          do save
          a = document.createElement 'a'
          a.download = '00.level'
          a.href = URL.createObjectURL new Blob [myStorage.get 'level']
          document.body.appendChild a
          do a.click
          document.body.removeChild a

        when 'o', 'O'
          do e.preventDefault
          input = document.createElement 'input'
          input.type = 'file'
          input.accept = '.level'
          input.onchange = ->
            chosenFile = input.files[0]
            return if not chosenFile?
            reader = new FileReader
            reader.onload = -> load reader.result
            reader.readAsText chosenFile
          do input.click

    pressedKeys.push key unless key in pressedKeys
    do trySetTile

  keyup = ({key}) ->
    pressedKeys.splice (pressedKeys.indexOf key), 1
    do trySetTile

  for tileDiv in boardDiv.childNodes
    tileDiv.onmouseenter = mouseenter.bind null, tileDiv

  boardDiv.onmouseleave = mouseleave

  window.onkeydown = keydown
  window.onkeyup = keyup

  return
