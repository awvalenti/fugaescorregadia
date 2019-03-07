updateGameModel = require '/model/updateGameModel'
movePlayerDiv = require '/domView/movePlayerDiv'

module.exports = (gameModel, domViewModel) ->
  keydown: (e) ->
    switch e.code
      when 'ArrowDown'
        oldPos = gameModel.playerPos

        gameModel = updateGameModel gameModel,
          x: gameModel.playerPos.x
          y: Math.floor Math.random() * 20

        newPos = gameModel.playerPos

        movePlayerDiv oldPos, newPos, domViewModel.playerDiv

  touchstart: (e) ->
    # TODO
