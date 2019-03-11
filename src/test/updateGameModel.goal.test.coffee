should = require 'should'

makeGameModel   = require '/model/makeGameModel.coffee'
updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = makeGameModel 3, [
    ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ]

  newGameModel = updateGameModel gameModel, 'RIGHT'

  context 'when GOAL is reached', ->
    it 'stops PLAYER at GOAL position', ->
      newGameModel.should.have.property('playerPos').deepEqual row: 0, col: 2

    it 'produces newLevel event', ->
      newGameModel.should.have.property('event').deepEqual newLevel: 4
