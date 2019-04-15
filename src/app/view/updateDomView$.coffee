require 'babel-polyfill' # Necessary for await

module.exports = ({
  setPlayerDivPosition$
  updateDivTile$
  setTranslation$
}) ->
  (coreState, domView, delta) ->
    {boardDiv, playerDiv, levelNumberElement, arrivalHandler} = domView
    {movement, newLevelNumber} = delta

    if movement?
      await setPlayerDivPosition$ movement.from, movement.to, arrivalHandler,
        playerDiv

    if newLevelNumber?
      divTiles = boardDiv.children

      coreState.boardState.forEach (rowData, rowIndex) ->
        rowData.forEach (tileName, colIndex) ->
          updateDivTile$ tileName, divTiles[rowIndex * rowData.length + colIndex]

      st = playerDiv.style
      st.transitionDuration = st.webkitTransitionDuration = null
      setTranslation$ coreState.playerPos, playerDiv

      levelNumberElement.textContent = newLevelNumber

    return
