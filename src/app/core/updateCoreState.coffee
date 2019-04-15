module.exports = ({
  loadLevelModel
  makeCoreState
}) ->
  (coreState, {movement, newLevelNumber}) ->
    if newLevelNumber?
      makeCoreState newLevelNumber, loadLevelModel newLevelNumber
    else if movement?
      makeCoreState coreState.levelNumber, coreState.boardState, movement.to
    else
      coreState
