setPlayerDivTranslation = require '/domView/setPlayerDivTranslation'

makeDiv = (className) ->
  ret = document.createElement 'div'
  ret.className = className
  ret

makeTileDiv = (tileName) ->
  makeDiv "tile #{tileName}"

module.exports = (i18n) -> (gameModel) ->
  # TODO Check if string concatenation with only one appendChild
  # call is more efficient

  boardDiv = makeDiv 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      boardDiv.appendChild makeTileDiv tileName

  playerDiv = makeTileDiv 'PLAYER'

  boardDiv.appendChild playerDiv

  setPlayerDivTranslation gameModel.playerPos, playerDiv

  { title: (i18n 'title'), boardDiv, playerDiv }
