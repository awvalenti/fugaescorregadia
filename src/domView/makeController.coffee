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
      when 'ArrowUp'    then move 'up'
      when 'ArrowRight' then move 'right'
      when 'ArrowDown'  then move 'down'
      when 'ArrowLeft'  then move 'left'

  touchstart: (e) ->
    # TODO
