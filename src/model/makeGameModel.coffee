findStartingPoint = (boardModel) ->
  for rowData, row in boardModel
    for tileType, col in rowData
      return { row, col } if tileType == 'starting-point'

  throw Error 'Missing starting point'

module.exports = (boardModel, playerPos = findStartingPoint boardModel) ->
  boardModel: boardModel
  playerPos: playerPos
