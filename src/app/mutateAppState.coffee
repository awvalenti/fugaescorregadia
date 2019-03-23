require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

makeMutateDomView = require '/domView/makeMutateDomView'

MAX_ENQUEUED_MOVES = 2

module.exports =
  (gameModel, updateGameModel, domView) ->
    mutateDomView = do makeMutateDomView

    queue = []
    processing = off

    (direction) ->
      return if queue.length >= MAX_ENQUEUED_MOVES

      queue.push direction

      return if processing

      processing = on
      loop
        direction = do queue.shift
        changeset = calculateGameModelChanges gameModel, direction
        gameModel = updateGameModel gameModel, changeset
        await mutateDomView gameModel, domView, changeset
        if changeset.newLevel?
          queue.length = 0
        break if queue.length is 0
      processing = off

      return
