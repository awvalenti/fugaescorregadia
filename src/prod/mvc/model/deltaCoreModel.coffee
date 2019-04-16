EMPTY_DELTA = {}

module.exports = ({
  loadLevelModel
  makeCoreModel
}) ->
  (coreModel, direction) ->
    switch direction
      when 'UP'    then incRow = -1; incCol =  0
      when 'RIGHT' then incRow =  0; incCol = +1
      when 'DOWN'  then incRow = +1; incCol =  0
      when 'LEFT'  then incRow =  0; incCol = -1
      else throw Error "#{direction} <-- invalid direction"

    level = coreModel.levelModel
    oldPos = coreModel.playerPos

    before = (newRow, newCol) ->
      inbounds = 0 <= newRow < level.length and 0 <= newCol <
        level[newRow].length
      if not inbounds or level[newRow][newCol] is 'OBSTACLE'
        'STOP'
      else
        'GO_ON'

    during = (row, col) ->
      switch level[row][col]
        when 'GOAL' then 'STOP'
        else 'GO_ON'

    {row, col} = oldPos
    loop
      newRow = row + incRow
      newCol = col + incCol
      break if before(newRow, newCol) is 'STOP'
      row = newRow
      col = newCol
      break if during(row, col) is 'STOP'

    if row == oldPos.row and col == oldPos.col
      EMPTY_DELTA
    else
      ret = movement: from: oldPos, to: {row, col}
      if level[row][col] is 'GOAL'
        newLevelNumber = coreModel.levelNumber + 1
        ret.coreModelForNewLevel = makeCoreModel newLevelNumber,
          loadLevelModel newLevelNumber
      ret
