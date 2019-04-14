makeCoreState = require '/app/core/makeCoreState'

module.exports = (readBoardState) -> (coreState, {movement, newLevel}) ->
  if newLevel?
    makeCoreState newLevel, readBoardState newLevel
  else if movement?
    makeCoreState coreState.levelNumber, coreState.boardState, movement.to
  else
    coreState
