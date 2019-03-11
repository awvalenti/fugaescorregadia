should = require 'should'

makeGameModel   = require '/model/makeGameModel.coffee'
updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = makeGameModel 0, [
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['START', 'EMPTY', 'EMPTY', 'OBSTACLE']
  ]

  it 'moves PLAYER until before an OBSTACLE', ->
    updateGameModel(gameModel, 'UP').should.have
      .property('playerPos').deepEqual row: 0, col: 0

  it 'moves PLAYER until before a board limit', ->
    updateGameModel(gameModel, 'RIGHT').should.have
      .property('playerPos').deepEqual row: 2, col: 2

  it 'preserves gameModel instance when already at final position', ->
    updateGameModel(gameModel, 'DOWN').should.equal gameModel
    updateGameModel(gameModel, 'LEFT').should.equal gameModel
