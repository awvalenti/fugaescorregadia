movePlayer = require '/domView/movePlayer'

makeDiv = (className) ->
  ret = document.createElement 'div'
  ret.className = className
  ret

makeTileDiv = (tileType) ->
  makeDiv "tile #{tileType}"

makeBoardDiv = (gameModel) ->
  # TODO Check if string concatenation with only one appendChild
  # call is more efficient

  boardDiv = makeDiv 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileType) ->
      boardDiv.appendChild makeTileDiv tileType

  playerDiv = makeTileDiv 'player'

  boardDiv.appendChild playerDiv

  movePlayer gameModel.playerPos, gameModel.playerPos, playerDiv

  boardDiv.movePlayer = (oldPos, newPos) -> movePlayer oldPos, newPos, playerDiv

  boardDiv

module.exports = (i18n) -> (gameModel) ->
  title: i18n 'title'
  boardDiv: makeBoardDiv gameModel
  movePlayer: -> @boardDiv.movePlayer.apply @boardDiv, arguments
