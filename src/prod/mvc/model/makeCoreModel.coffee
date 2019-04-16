findStart = (levelModel) ->
  for rowData, row in levelModel
    for tileName, col in rowData
      return {row, col} if tileName == 'START'

  throw Error 'Missing START'

module.exports = (levelNumber, levelModel, playerPos = findStart(levelModel)) ->
  {levelNumber, levelModel, playerPos}
