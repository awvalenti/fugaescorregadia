module.exports = ({
  makeLevelModel
  makeCoreState
}) ->
  (coreState, {movement, newLevel}) ->
    if newLevel?
      makeCoreState newLevel, makeLevelModel newLevel
    else if movement?
      makeCoreState coreState.levelNumber, coreState.boardState, movement.to
    else
      coreState
