require 'babel-polyfill' # Necessary for await

calculateGameModelChanges = require '/model/calculateGameModelChanges'
updateGameModel = require '/model/updateGameModel'

mutateDomView           = require '/domView/mutateDomView'

module.exports = (i18n) -> (gameModel, domView) ->
  move = (direction) ->
    changeset = calculateGameModelChanges gameModel, direction
    gameModel = updateGameModel gameModel, changeset
    await mutateDomView gameModel, domView, changeset
    return

  keydown: (e) ->
    switch e.code
      when 'ArrowUp'    then move 'UP'
      when 'ArrowRight' then move 'RIGHT'
      when 'ArrowDown'  then move 'DOWN'
      when 'ArrowLeft'  then move 'LEFT'
    return

  touchstart: (e) ->
    # TODO
