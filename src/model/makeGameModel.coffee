findStartingPoint = (boardModel) ->
  for row, y in boardModel
    for tileType, x in row
      return { x, y } if tileType == 'starting-point'

  throw Error 'Missing starting point'

make = (boardModel, playerPos) ->
  boardModel: boardModel
  playerPos: playerPos
  update: (playerPos) -> make boardModel, playerPos

module.exports = (boardModel) -> make boardModel, findStartingPoint boardModel
