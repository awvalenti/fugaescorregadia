makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, direction) ->
  switch direction
    when 'up'    then incRow = -1; incCol =  0
    when 'right' then incRow =  0; incCol = +1
    when 'down'  then incRow = +1; incCol =  0
    when 'left'  then incRow =  0; incCol = -1
    else throw Error "#{direction} <-- invalid direction"

  board = gameModel.boardModel
  oldPos = gameModel.playerPos

  inbounds = (row, col) ->
    0 <= row < board.length and 0 <= col < board[row].length

  # Solution 1: iterative
  row = oldPos.row
  col = oldPos.col
  loop
    newRow = row + incRow
    newCol = col + incCol
    break if not inbounds(newRow, newCol) or board[newRow][newCol] == 'obstacle'
    row = newRow
    col = newCol

  # # Solution 2: tail-recursive
  # calculateNewPos = (row, col) ->
  #   newRow = row + incRow
  #   newCol = col + incCol
  #   if not inbounds(newRow, newCol) or board[newRow][newCol] == 'obstacle'
  #     {row, col}
  #   else
  #     calculateNewPos newRow, newCol
  # {row, col} = calculateNewPos oldPos.row, oldPos.col

  if row == oldPos.row and col == oldPos.col
    gameModel
  else
    makeGameModel board, {row, col}
