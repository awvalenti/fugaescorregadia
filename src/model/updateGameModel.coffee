makeGameModel = require '/model/makeGameModel'

module.exports = (readBoardModel) -> (gameModel, {movement, newLevel}) ->
  if newLevel?
    makeGameModel newLevel, readBoardModel newLevel
  else if movement?
    makeGameModel gameModel.level, gameModel.boardModel, movement.to
  else
    gameModel
