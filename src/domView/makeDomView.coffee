mutateDivTile     = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

makeTileDiv = (tileName) ->
  ret = document.createElement 'div'
  mutateDivTile tileName, ret
  ret

module.exports = (i18n) -> (gameModel) ->
  # TODO Check if string concatenation with only one appendChild
  # call is more efficient

  boardDiv = document.createElement 'div'
  boardDiv.className = 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      boardDiv.appendChild makeTileDiv tileName

  playerDiv = makeTileDiv 'PLAYER'

  boardDiv.appendChild playerDiv

  mutateTranslation gameModel.playerPos, playerDiv

  { title: (i18n 'title'), boardDiv, playerDiv }
