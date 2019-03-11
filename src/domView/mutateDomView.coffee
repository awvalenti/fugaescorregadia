mutatePlayerDivPosition = require '/domView/mutatePlayerDivPosition'
mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

module.exports = (gameModel, domView, {movement, newLevel}) ->
  if movement?
    await mutatePlayerDivPosition movement.from, movement.to, domView.playerDiv

  if newLevel?
    divTiles = domView.boardDiv.children

    gameModel.boardModel.forEach (rowData, rowIndex) ->
      rowData.forEach (tileName, colIndex) ->
        mutateDivTile tileName, divTiles[rowIndex * rowData.length + colIndex]

    playerDiv = domView.playerDiv
    playerDiv.style.transitionDuration = null
    mutateTranslation gameModel.playerPos, playerDiv

  return
