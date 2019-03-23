require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'

makeMutateDomView = require '/domView/makeMutateDomView'

MAX_ENQUEUED_MOVES = 2

class Q
  constructor: ->
    @q = []
    @processing = off
    @maxSize = 2

  add: (item) ->
    return if @q.length >= @maxSize
    @q.push item
    return if @processing
    do @_process
    return

  _process: ->
    @processing = on
    loop
      result = await do do @q.shift
      if result == 'CANCEL_NEXT_ONES'
        @q.length = 0
      break if @q.length is 0
    @processing = off
    return


module.exports =
  (gameModel, updateGameModel, domView) ->
    mutateDomView = do makeMutateDomView

    queue = new Q

    (direction) ->
      queue.add ->
        changeset = calculateGameModelChanges gameModel, direction
        gameModel = updateGameModel gameModel, changeset
        await mutateDomView gameModel, domView, changeset
        if changeset.newLevel?
          'CANCEL_NEXT_ONES'
        else
          'GO_ON'
      return
