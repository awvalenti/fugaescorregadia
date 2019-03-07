makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, direction) ->
  switch direction
    when 'up'    then increment = x:  0,  y: -1
    when 'right' then increment = x: +1,  y:  0
    when 'down'  then increment = x:  0,  y: +1
    when 'left'  then increment = x: -1,  y:  0
    else throw Error "#{direction} <-- invalid direction"

  newPos =
    x: gameModel.playerPos.x + increment.x
    y: gameModel.playerPos.y + increment.y

  makeGameModel gameModel.boardModel, newPos
