# TODO Refactor: separate into many files

mapping = (tileName) ->
  switch tileName
    when 'EMPTY' then '-'
    when 'GOAL' then 'g'
    when 'OBSTACLE' then 'o'
    when 'START' then 's'
    else throw Error "'#{tileName}' <-- invalid tileName"

tileNameFor = (key) ->
  switch key
    when '0', 'Delete', '.', ',' then 'EMPTY'
    when '1' then 'START'
    when '2' then 'GOAL'
    when '3' then 'OBSTACLE'

markAsUnsaved$ = () -> document.title = '⚪ Unsaved'
markAsSaved$ = () -> document.title = '✔️ Saved'

module.exports = ({
  makeLevelModel
  updateDomView$
  makeCoreState
  updateDivTile$
  myStorage
  domView
  colCount
}) ->
  {boardDiv, playerDiv} = domView

  pointedTileDiv = null
  pressedKeys = []

  boardDiv.removeChild playerDiv

  save$ = ->
    myStorage.set$ 'levelString', Array::reduce.call boardDiv.childNodes,
      (ret, tileDiv, i) ->
        ret += mapping tileDiv.classList[1]
        ret += if (i + 1) % colCount is 0 then '\n' else ' '
      , ''
    do markAsSaved$
    return

  load$ = (levelString) ->
    updateDomView$ makeCoreState(0, makeLevelModel levelString), domView,
      {newLevelNumber: 0}
    do save$
    return

  trySetTile$ = ->
    keys = pressedKeys
    if pointedTileDiv? and tileName = tileNameFor keys[keys.length - 1]
      updateDivTile$ tileName, pointedTileDiv
      do markAsUnsaved$
    return

  mouseenter = (tileDiv) ->
    pointedTileDiv = tileDiv
    do trySetTile$
    return

  mouseleave = ->
    pointedTileDiv = null
    return

  keydown = (e) ->
    {key} = e

    if e.ctrlKey
      switch key
        when 's', 'S'
          do e.preventDefault
          do save$

        when 'e', 'E'
          do e.preventDefault
          do save$
          a = document.createElement 'a'
          a.download = '00.level'
          a.href = URL.createObjectURL new Blob [myStorage.get$ 'levelString']
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
            reader.onload = -> load$ reader.result
            reader.readAsText chosenFile
          do input.click

    pressedKeys.push key unless key in pressedKeys
    do trySetTile$

  keyup = ({key}) ->
    pressedKeys.splice (pressedKeys.indexOf key), 1
    do trySetTile$
    return

  load$ levelString if (levelString = myStorage.get$ 'levelString')?

  for tileDiv in boardDiv.childNodes
    tileDiv.onmouseenter = mouseenter.bind null, tileDiv

  boardDiv.onmouseleave = mouseleave

  window.onkeydown = keydown
  window.onkeyup = keyup

  return
