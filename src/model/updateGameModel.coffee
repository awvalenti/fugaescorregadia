makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, direction) ->
  switch direction
    when 'UP'    then incRow = -1; incCol =  0
    when 'RIGHT' then incRow =  0; incCol = +1
    when 'DOWN'  then incRow = +1; incCol =  0
    when 'LEFT'  then incRow =  0; incCol = -1
    else throw Error "#{direction} <-- invalid direction"

  board = gameModel.boardModel
  oldPos = gameModel.playerPos

  before = (newRow, newCol) ->
    inbounds = 0 <= newRow < board.length and 0 <= newCol < board[newRow].length
    if not inbounds or board[newRow][newCol] is 'OBSTACLE'
      'STOP'
    else
      'GO_ON'

  during = (row, col) ->
    switch board[row][col]
      when 'GOAL' then 'STOP'
      else 'GO_ON'

  row = oldPos.row
  col = oldPos.col
  loop
    newRow = row + incRow
    newCol = col + incCol
    break if before(newRow, newCol) is 'STOP'
    row = newRow
    col = newCol
    break if during(row, col) is 'STOP'

  if row == oldPos.row and col == oldPos.col
    gameModel
  else
    level = gameModel.level
    event = newLevel: level + 1 if board[row][col] is 'GOAL'
    makeGameModel level, board, {row, col}, event
