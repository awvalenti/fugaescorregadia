require 'babel-polyfill' # Necessary for await

setPlayerDivPosition$ = require '/domView/setPlayerDivPosition$'
updateDivTile$ = require '/domView/updateDivTile$'
setTranslation$ = require '/domView/setTranslation$'

module.exports = (gameModel, domView, changeset) ->
  {boardDiv, playerDiv, levelNumberElement, arrivalHandler} = domView
  {movement, newLevel} = changeset

  if movement?
    await setPlayerDivPosition$ movement.from, movement.to, arrivalHandler,
      playerDiv

  if newLevel?
    divTiles = boardDiv.children

    gameModel.boardModel.forEach (rowData, rowIndex) ->
      rowData.forEach (tileName, colIndex) ->
        updateDivTile$ tileName, divTiles[rowIndex * rowData.length + colIndex]

    st = playerDiv.style
    st.transitionDuration = st.webkitTransitionDuration = null
    setTranslation$ gameModel.playerPos, playerDiv

    levelNumberElement.textContent = newLevel

  return
