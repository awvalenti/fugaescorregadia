should = require 'should'

makeGameModel   = require '/model/makeGameModel.coffee'
updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = makeGameModel [
    ['empty',          'empty', 'empty', 'empty'   ]
    ['empty',          'empty', 'empty', 'empty'   ]
    ['starting-point', 'empty', 'empty', 'obstacle']
  ]

  it 'moves player until before an obstacle', ->
    updateGameModel(gameModel, 'up').should.have
      .property('playerPos').deepEqual row: 0, col: 0

  it 'moves player until before a board limit', ->
    updateGameModel(gameModel, 'right').should.have
      .property('playerPos').deepEqual row: 2, col: 2

  it 'preserves gameModel instance when already at final position', ->
    updateGameModel(gameModel, 'down').should.equal gameModel
    updateGameModel(gameModel, 'left').should.equal gameModel
