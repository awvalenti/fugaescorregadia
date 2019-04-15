module.exports = ({
  loadLevelModel
  makeCoreModel
}) ->
  (coreModel, {movement, newLevelNumber}) ->
    if newLevelNumber?
      makeCoreModel newLevelNumber, loadLevelModel newLevelNumber
    else if movement?
      makeCoreModel coreModel.levelNumber, coreModel.boardState, movement.to
    else
      coreModel
