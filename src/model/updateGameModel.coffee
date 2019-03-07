makeGameModel = require '/model/makeGameModel'

module.exports = (gameModel, newPos) ->
  makeGameModel gameModel.boardModel, newPos
