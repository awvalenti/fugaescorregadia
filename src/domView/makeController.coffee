updateGameModel = require '/model/updateGameModel'
movePlayerDiv = require '/domView/movePlayerDiv'

module.exports = (gameModel, domViewModel) ->
  move = (direction) ->
    oldPos = gameModel.playerPos
    gameModel = updateGameModel gameModel, direction
    newPos = gameModel.playerPos
    if newPos != oldPos
      movePlayerDiv oldPos, newPos, domViewModel.playerDiv

  keydown: (e) ->
    switch e.code
      when 'ArrowUp'    then move 'UP'
      when 'ArrowRight' then move 'RIGHT'
      when 'ArrowDown'  then move 'DOWN'
      when 'ArrowLeft'  then move 'LEFT'

  touchstart: (e) ->
    # TODO
