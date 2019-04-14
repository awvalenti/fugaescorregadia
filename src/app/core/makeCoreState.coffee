findStart = (boardState) ->
  for rowData, row in boardState
    for tileName, col in rowData
      return {row, col} if tileName == 'START'

  throw Error 'Missing START'

module.exports = (levelNumber, boardState, playerPos = findStart(boardState)) ->
  {levelNumber, boardState, playerPos}
