require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

makeMutateDomView = require '/domView/makeMutateDomView'

module.exports =
  (gameModel, updateGameModel, domView) ->
    mutateDomView = do makeMutateDomView

    queue = []
    processing = off

    (direction) ->
      return if queue.length >= 3   # Maximum number of enqueued actions

      queue.push direction

      return if processing

      processing = on
      loop
        direction = queue[0]
        changeset = calculateGameModelChanges gameModel, direction
        gameModel = updateGameModel gameModel, changeset
        await mutateDomView gameModel, domView, changeset
        do queue.shift
        break if queue.length is 0
      processing = off

      return
