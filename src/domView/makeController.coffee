updateGameModel = require '/model/updateGameModel'
movePlayerDiv   = require '/domView/movePlayerDiv'

module.exports = (i18n) -> (gameModel, domViewModel) ->
  move = (direction) ->
    oldPos = gameModel.playerPos
    gameModel = updateGameModel gameModel, direction
    movePlayerDiv oldPos, gameModel.playerPos, domViewModel.playerDiv
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
