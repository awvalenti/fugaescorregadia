mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

makeTileDiv = (tileName) ->
  ret = document.createElement 'div'
  mutateDivTile tileName, ret
  ret

module.exports = (i18n) -> (gameModel) ->
  boardDiv = document.createElement 'div'
  boardDiv.className = 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      boardDiv.appendChild makeTileDiv tileName

  playerDiv = makeTileDiv 'PLAYER'

  # This delay to setTimeout is a wait time between ending player move animation
  # and starting a new one. It's useful because browsers fire
  # transitionend event too soon, when the playerDiv is not yet where
  # it should be, causing misbehavior.
  # arrivalHandler.resolve must be set later to the resolve
  # function of a Promise.
  arrivalHandler = -> setTimeout arrivalHandler.resolve, 20

  playerDiv.addEventListener 'webkitTransitionEnd', arrivalHandler
  playerDiv.addEventListener 'transitionend', arrivalHandler

  boardDiv.appendChild playerDiv

  mutateTranslation gameModel.playerPos, playerDiv

  {title: i18n('title'), boardDiv, playerDiv, arrivalHandler}
