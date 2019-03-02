readBoardModel = require '/model/readBoardModel'

makeBoardDiv = (boardModel) ->
  # TODO Check if string concatenation with only one appendChild
  # call is more efficient
  boardDiv = document.createElement 'div'
  boardDiv.className = 'board'

  boardModel.forEach (row) ->
    row.forEach (tileType) ->
      tile = document.createElement 'div'
      tile.className = "tile #{tileType}"
      boardDiv.appendChild tile
  boardDiv

module.exports = (i18n) ->
  title: i18n 'title'
  boardDiv: makeBoardDiv readBoardModel 0
