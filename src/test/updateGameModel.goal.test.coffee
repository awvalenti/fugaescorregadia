should = require 'should'

makeGameModel   = require '/model/makeGameModel.coffee'
updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = makeGameModel [
    ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ]

  newGameModel = updateGameModel gameModel, 'RIGHT'

  describe 'when reaching GOAL', ->
    it 'stops PLAYER at GOAL position', ->
      newGameModel.should.have.property('playerPos').deepEqual row: 0, col: 2

    it 'signals GOAL_REACHED', ->
      newGameModel.should.have.property('event').equal 'GOAL_REACHED'
