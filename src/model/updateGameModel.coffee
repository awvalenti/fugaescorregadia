makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, direction) ->
  switch direction
    when 'up'    then incRow = -1; incCol =  0
    when 'right' then incRow =  0; incCol = +1
    when 'down'  then incRow = +1; incCol =  0
    when 'left'  then incRow =  0; incCol = -1
    else throw Error "#{direction} <-- invalid direction"

  oldPos = gameModel.playerPos

  row = oldPos.row
  col = oldPos.col

  board = gameModel.boardModel

  inbounds = (r, c) -> 0 <= r < board.length and 0 <= c < board[r].length

  loop
    newRow = row + incRow
    newCol = col + incCol
    break if not inbounds(newRow, newCol) or board[newRow][newCol] == 'obstacle'
    row = newRow
    col = newCol

  if col == oldPos.col and row == oldPos.row
    gameModel
  else
    makeGameModel board, {row, col}
