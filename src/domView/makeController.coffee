require 'babel-polyfill' # Necessary for await

updateGameModel           = require '/model/updateGameModel'
mutatePlayerDivPosition   = require '/domView/mutatePlayerDivPosition'

module.exports = (i18n) -> (gameModel, domView) ->
  move = (direction) ->
    oldPos = gameModel.playerPos
    gameModel = updateGameModel gameModel, direction
    await mutatePlayerDivPosition oldPos, gameModel.playerPos, domView.playerDiv
    if gameModel.event is 'GOAL_REACHED'
      # TODO
      alert (i18n 'goal-reached')

  keydown: (e) ->
    switch e.code
      when 'ArrowUp'    then move 'UP'
      when 'ArrowRight' then move 'RIGHT'
      when 'ArrowDown'  then move 'DOWN'
      when 'ArrowLeft'  then move 'LEFT'

  touchstart: (e) ->
    # TODO
