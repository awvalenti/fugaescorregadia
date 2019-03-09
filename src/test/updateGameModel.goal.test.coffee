should = require 'should'

makeGameModel   = require '/model/makeGameModel.coffee'
updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = makeGameModel [
    ['starting-point', 'empty', 'goal', 'empty']
  ]

  newGameModel = updateGameModel gameModel, 'right'

  describe 'when reaching goal', ->
    it 'stops at proper position', ->
      newGameModel.should.have.property('playerPos').deepEqual row: 0, col: 2

    xit 'signals goal reached', ->
      newGameModel.should.have.property('extra').equal 'goal-reached'
