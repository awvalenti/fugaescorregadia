require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

mutateDomView = require '/domView/mutateDomView'

module.exports = (gameModel, updateGameModel, domView) -> (direction) ->
  changeset = calculateGameModelChanges gameModel, direction
  gameModel = updateGameModel gameModel, changeset
  await mutateDomView gameModel, domView, changeset
  return
