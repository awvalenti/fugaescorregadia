findStartingPoint = (boardModel) ->
  for row, y in boardModel
    for tileType, x in row
      return { x, y } if tileType == 'starting-point'

  throw Error 'Missing starting point'

module.exports = (boardModel, playerPos = findStartingPoint boardModel) ->
  boardModel: boardModel
  playerPos: playerPos
