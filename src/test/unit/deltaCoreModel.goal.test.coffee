should = require 'should'

makeCoreModel = require '/prod/mvc/model/makeCoreModel'
deltaCoreModel = require '/prod/mvc/model/deltaCoreModel'

describe 'deltaCoreModel', ->
  coreModel = makeCoreModel 3, [
    ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ]

  changes = deltaCoreModel coreModel, 'RIGHT'

  context 'when GOAL is reached', ->
    it 'tells PLAYER to stop at GOAL position', ->
      changes.should.have.property('movement').deepEqual
        from: row: 0, col: 0
        to: row: 0, col: 2

    it 'informs newLevelNumber', ->
      changes.should.have.property('newLevelNumber').equal 4
