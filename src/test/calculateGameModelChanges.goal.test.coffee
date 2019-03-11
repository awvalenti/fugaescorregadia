should = require 'should'

makeGameModel             = require '/model/makeGameModel.coffee'
calculateGameModelChanges = require '/model/calculateGameModelChanges.coffee'

describe 'calculateGameModelChanges', ->
  gameModel = makeGameModel 3, [
    ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ]

  changes = calculateGameModelChanges gameModel, 'RIGHT'

  context 'when GOAL is reached', ->
    it 'tells PLAYER to stop at GOAL position', ->
      changes.should.have.property('movement').deepEqual
        from: row: 0, col: 0
        to: row: 0, col: 2

    it 'informs newLevel', ->
      changes.should.have.property('newLevel').equal 4
