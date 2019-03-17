makeMutatePlayerDivPosition = require '/domView/makeMutatePlayerDivPosition'
mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

module.exports = () ->
  mutatePlayerDivPosition = do makeMutatePlayerDivPosition

  (gameModel, {boardDiv, playerDiv, arrivalHandler}, {movement, newLevel}) ->
    if movement?
      await mutatePlayerDivPosition movement.from, movement.to, arrivalHandler,
        playerDiv

    if newLevel?
      divTiles = boardDiv.children

      gameModel.boardModel.forEach (rowData, rowIndex) ->
        rowData.forEach (tileName, colIndex) ->
          mutateDivTile tileName, divTiles[rowIndex * rowData.length + colIndex]

      st = playerDiv.style
      st.transitionDuration = st.webkitTransitionDuration = null
      mutateTranslation gameModel.playerPos, playerDiv

    return
