readBoardModel = require '/model/readBoardModel'

findStart = (boardModel) ->
  for rowData, row in boardModel
    for tileName, col in rowData
      return { row, col } if tileName == 'START'

  throw Error 'Missing START'

module.exports =
  (level = 0,
  boardModel = readBoardModel(level),
  playerPos = findStart(boardModel),
  event = null) ->
    {boardModel, playerPos, level, event}
