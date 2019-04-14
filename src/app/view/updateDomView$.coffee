require 'babel-polyfill' # Necessary for await

setPlayerDivPosition$ = require '/app/view/setPlayerDivPosition$'
updateDivTile$ = require '/app/view/updateDivTile$'
setTranslation$ = require '/app/view/setTranslation$'

module.exports = (coreState, domView, delta) ->
  {boardDiv, playerDiv, levelNumberElement, arrivalHandler} = domView
  {movement, newLevel} = delta

  if movement?
    await setPlayerDivPosition$ movement.from, movement.to, arrivalHandler,
      playerDiv

  if newLevel?
    divTiles = boardDiv.children

    coreState.boardState.forEach (rowData, rowIndex) ->
      rowData.forEach (tileName, colIndex) ->
        updateDivTile$ tileName, divTiles[rowIndex * rowData.length + colIndex]

    st = playerDiv.style
    st.transitionDuration = st.webkitTransitionDuration = null
    setTranslation$ coreState.playerPos, playerDiv

    levelNumberElement.textContent = newLevel

  return
