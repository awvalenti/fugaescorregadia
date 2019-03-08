makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, direction) ->
  switch direction
    when 'up'    then increment = x:  0,  y: -1
    when 'right' then increment = x: +1,  y:  0
    when 'down'  then increment = x:  0,  y: +1
    when 'left'  then increment = x: -1,  y:  0
    else throw Error "#{direction} <-- invalid direction"

  oldPos = gameModel.playerPos

  x = oldPos.x
  y = oldPos.y

  board = gameModel.boardModel

  inbounds = (x, y) -> 0 <= y < board.length and 0 <= x < board[y].length

  loop
    newX = x + increment.x
    newY = y + increment.y
    break if not inbounds(newX, newY) or board[newY][newX] == 'obstacle'
    x = newX
    y = newY

  if x == oldPos.x and y == oldPos.y
    gameModel
  else
    makeGameModel board, {x, y}
