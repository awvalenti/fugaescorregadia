updateDivTile$ = require '/domView/updateDivTile$'
setTranslation$ = require '/domView/setTranslation$'
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
  updateDivTile$ tileName, ret
  ret

makePlayerDiv = (arrivalHandler, {playerPos}) ->
  ret = makeTileDiv 'PLAYER'
  ret.addEventListener 'webkitTransitionEnd', arrivalHandler
  ret.addEventListener 'transitionend', arrivalHandler
  setTranslation$ playerPos, ret
  ret

makeBoardDiv = (gameModel, playerDiv) ->
  ret = document.createElement 'div'
  ret.className = 'board'
  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      ret.appendChild makeTileDiv tileName
  ret.appendChild playerDiv
  ret

module.exports = (i18n) -> (gameModel, levelNumber) ->
  arrivalHandler = do makeArrivalHandler

  playerDiv = makePlayerDiv arrivalHandler, gameModel

  # XXX Maybe should build this element dynamically
  # instead of relying on its presence on the page
  levelNumberElement = document.getElementById('level-number')
  levelNumberElement.textContent = levelNumber

  {
    title: i18n 'title'
    version: 'v' + appVersion
    levelText: i18n 'level'
    levelNumberElement
    boardDiv: makeBoardDiv gameModel, playerDiv
    playerDiv
    arrivalHandler
  }
