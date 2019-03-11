require 'babel-polyfill' # Necessary for await

makeGameModel  = require '/model/makeGameModel'
mutateDomView  = require '/domView/mutateDomView'

updateGameModel           = require '/model/updateGameModel'
mutatePlayerDivPosition   = require '/domView/mutatePlayerDivPosition'

module.exports = (i18n) -> (gameModel, domView) ->
  move = (direction) ->
    oldPos = gameModel.playerPos
    gameModel = updateGameModel gameModel, direction
    await mutatePlayerDivPosition oldPos, gameModel.playerPos, domView.playerDiv
    newLevel = gameModel.event?.newLevel
    if newLevel?
      gameModel = makeGameModel newLevel
      mutateDomView gameModel, domView
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
