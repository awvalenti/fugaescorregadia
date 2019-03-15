makeMutatePlayerDivPosition = require '/domView/makeMutatePlayerDivPosition'
mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

module.exports = () ->
  mutatePlayerDivPosition = do makeMutatePlayerDivPosition

  (gameModel, {boardDiv, playerDiv}, {movement, newLevel}) ->
    if movement?
      await mutatePlayerDivPosition gameModel.boardModel.length,
        gameModel.boardModel[0].length,
        movement.from, movement.to, playerDiv

    if newLevel?
      divTiles = boardDiv.children

      gameModel.boardModel.forEach (rowData, rowIndex) ->
        rowData.forEach (tileName, colIndex) ->
          mutateDivTile tileName, divTiles[rowIndex * rowData.length + colIndex]

      st = playerDiv.style
      st.transitionDuration = st['-webkit-transition-duration'] = null
      mutateTranslation gameModel.boardModel.length,
        gameModel.boardModel[0].length, gameModel.playerPos, playerDiv

    return
