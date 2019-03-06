module.exports = (gameModel, domViewModel) ->
  keydown: (e) ->
    switch e.code
      when 'ArrowDown'
        oldPos = gameModel.playerPos

        gameModel = gameModel.update
          x: gameModel.playerPos.x
          y: Math.floor Math.random() * 20

        newPos = gameModel.playerPos

        domViewModel.movePlayer oldPos, newPos

  touchstart: (e) ->
    y = Math.floor Math.random() * 20
    gameModel.move()
