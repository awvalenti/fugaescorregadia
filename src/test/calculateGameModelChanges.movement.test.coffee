should = require 'should'

makeGameModel = require '/model/makeGameModel.coffee'
calculateGameModelChanges = require '/model/calculateGameModelChanges.coffee'

describe 'calculateGameModelChanges', ->
  gameModel = makeGameModel 0, [
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['START', 'EMPTY', 'EMPTY', 'OBSTACLE']
  ]

  it 'tells PLAYER to stop just before OBSTACLE', ->
    calculateGameModelChanges(gameModel, 'UP').should.have
      .property('movement').deepEqual
        from: row: 2, col: 0
        to: row: 0, col: 0

  it 'tells PLAYER to stop just before board limits', ->
    calculateGameModelChanges(gameModel, 'RIGHT').should.have
      .property('movement').deepEqual
        from: row: 2, col: 0
        to: row: 2, col: 2

  it 'produces empty changeset when nothing changes', ->
    calculateGameModelChanges(gameModel, 'DOWN').should.deepEqual {}
    calculateGameModelChanges(gameModel, 'LEFT').should.deepEqual {}
