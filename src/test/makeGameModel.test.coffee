should = require 'should'

makeGameModel = require '/model/makeGameModel.coffee'

describe 'makeGameModel', ->
  gameModel = makeGameModel 2, [
    ['EMPTY', 'EMPTY']
    ['START', 'EMPTY']
    ['EMPTY', 'EMPTY']
  ]

  it 'stores levelNumber', ->
    gameModel.should.have.property('levelNumber').equal 2

  it 'finds PLAYER position', ->
    gameModel.should.have.property('playerPos').deepEqual row: 1, col: 0
