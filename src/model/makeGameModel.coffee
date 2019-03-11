findStart = (boardModel) ->
  for rowData, row in boardModel
    for tileName, col in rowData
      return {row, col} if tileName == 'START'

  throw Error 'Missing START'

module.exports = (level, boardModel, playerPos = findStart(boardModel)) ->
  {level, boardModel, playerPos}
