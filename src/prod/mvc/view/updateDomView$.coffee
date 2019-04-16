require 'babel-polyfill' # Necessary for await

module.exports = ({
  setPlayerDivPosition$
  updateDivTile$
  setTranslation$
  moveEndListener
}) ->
  (domView, delta) ->
    {boardDiv, playerDiv, levelNumberElement} = domView
    {movement, coreModelForNewLevel} = delta

    if movement?
      await setPlayerDivPosition$ movement.from, movement.to, moveEndListener,
        playerDiv

    if coreModelForNewLevel?
      {levelNumber, levelModel, playerPos} = coreModelForNewLevel
      divTiles = boardDiv.children

      levelModel.forEach (rowData, rowIndex) ->
        rowData.forEach (tileName, colIndex) ->
          updateDivTile$ tileName, divTiles[rowIndex * rowData.length +
            colIndex]

      st = playerDiv.style
      st.transitionDuration = st.webkitTransitionDuration = null
      setTranslation$ playerPos, playerDiv

      levelNumberElement.textContent = levelNumber

    return
