movePlayerDiv = require '/domView/movePlayerDiv'

makeDiv = (className) ->
  ret = document.createElement 'div'
  ret.className = className
  ret

makeTileDiv = (tileType) ->
  makeDiv "tile #{tileType}"

module.exports = (i18n) -> (gameModel) ->
  # TODO Check if string concatenation with only one appendChild
  # call is more efficient

  boardDiv = makeDiv 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileType) ->
      boardDiv.appendChild makeTileDiv tileType

  playerDiv = makeTileDiv 'PLAYER'

  boardDiv.appendChild playerDiv

  movePlayerDiv gameModel.playerPos, gameModel.playerPos, playerDiv

  { title: (i18n 'title'), boardDiv, playerDiv }
