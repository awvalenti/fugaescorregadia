movePlayer = require '/domView/movePlayer'

module.exports = (gameModel, domViewModel) ->
  keydown: (e) ->
    switch e.code
      when 'ArrowDown'
        oldPos = gameModel.playerPos

        gameModel = gameModel.update
          x: gameModel.playerPos.x
          y: Math.floor Math.random() * 20

        newPos = gameModel.playerPos

        movePlayer oldPos, newPos, domViewModel.playerDiv

  touchstart: (e) ->
    # TODO
