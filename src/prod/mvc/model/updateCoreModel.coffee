module.exports = ({
  makeCoreModel
}) ->
  (coreModel, delta) ->
    {movement, coreModelForNewLevel} = delta
    if coreModelForNewLevel?
      coreModelForNewLevel
    else if movement?
      makeCoreModel coreModel.levelNumber, coreModel.levelModel, movement.to
    else
      coreModel
