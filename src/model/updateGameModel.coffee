makeGameModel = require '/model/makeGameModel'

module.exports = (readBoardModel) -> (gameModel, {movement, newLevel}) ->
  if newLevel?
    makeGameModel newLevel, readBoardModel newLevel
  else if movement?
    makeGameModel gameModel.levelNumber, gameModel.boardModel, movement.to
  else
    gameModel
