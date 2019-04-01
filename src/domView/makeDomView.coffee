mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'
appVersion = require '/app/appVersion'

makeArrivalHandler = ->
  # arrivalHandler is the function that will be called when the
  # playerDiv animation (a.k.a. transition) ends.
  #
  # We need to handle the transitionend event in order to process user
  # input and animations correctly. Browsers fire this event too soon,
  # when the animation hasn't really finished yet.
  #
  # That's why we add a small additional delay. That's what the setTimeout
  # below is about.
  #
  # arrivalHandler.resolve is currently undefined, but will be set later
  # by the funciton that starts the animation. It will be set to a
  # resolve function of a Promise.
  ret = -> setTimeout ret.resolve, 20

makeTileDiv = (tileName) ->
  ret = document.createElement 'div'
  mutateDivTile tileName, ret
  ret

makePlayerDiv = (arrivalHandler, {playerPos}) ->
  ret = makeTileDiv 'PLAYER'
  ret.addEventListener 'webkitTransitionEnd', arrivalHandler
  ret.addEventListener 'transitionend', arrivalHandler
  mutateTranslation playerPos, ret
  ret

makeBoardDiv = (gameModel, playerDiv) ->
  ret = document.createElement 'div'
  ret.className = 'board'
  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      ret.appendChild makeTileDiv tileName
  ret.appendChild playerDiv
  ret

module.exports = (i18n) -> (gameModel) ->
  arrivalHandler = do makeArrivalHandler

  playerDiv = makePlayerDiv arrivalHandler, gameModel

  {
    title: i18n 'title'
    version: appVersion
    boardDiv: makeBoardDiv gameModel, playerDiv
    playerDiv
    arrivalHandler
  }
