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

  before = (newRow, newCol) ->
    inbounds = 0 <= newRow < board.length and 0 <= newCol < board[newRow].length
    if not inbounds or board[newRow][newCol] is 'obstacle'
      'stop'
    else
      'go-on'

  during = (row, col) ->
    switch board[row][col]
      when 'goal' then 'stop'
      else 'go-on'

  row = oldPos.row
  col = oldPos.col
  loop
    newRow = row + incRow
    newCol = col + incCol
    break if before(newRow, newCol) is 'stop'
    row = newRow
    col = newCol
    break if during(row, col) is 'stop'

  if row == oldPos.row and col == oldPos.col
    gameModel
  else
    makeGameModel board, {row, col}
