makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, {movement, newLevel}) ->
  if newLevel?
    makeGameModel newLevel
  else if movement?
    makeGameModel gameModel.level, gameModel.boardModel, movement.to
  else
    gameModel
