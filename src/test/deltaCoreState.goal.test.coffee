should = require 'should'

makeCoreState = require '/app/core/makeCoreState.coffee'
deltaCoreState = require '/app/core/deltaCoreState.coffee'

describe 'deltaCoreState', ->
  coreState = makeCoreState 3, [
    ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ]

  changes = deltaCoreState coreState, 'RIGHT'

  context 'when GOAL is reached', ->
    it 'tells PLAYER to stop at GOAL position', ->
      changes.should.have.property('movement').deepEqual
        from: row: 0, col: 0
        to: row: 0, col: 2

    it 'informs newLevel', ->
      changes.should.have.property('newLevel').equal 4
