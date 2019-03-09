findStart = (boardModel) ->
  for rowData, row in boardModel
    for tileType, col in rowData
      return { row, col } if tileType == 'START'

  throw Error 'Missing START'

module.exports = (boardModel, playerPos = findStart(boardModel), event) ->
  {boardModel, playerPos, event}
