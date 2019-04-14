should = require 'should'

makeCoreState = require '/app/core/makeCoreState.coffee'
deltaCoreState = require '/app/core/deltaCoreState.coffee'

describe 'deltaCoreState', ->
  coreState = makeCoreState 0, [
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
    ['START', 'EMPTY', 'EMPTY', 'OBSTACLE']
  ]

  it 'tells PLAYER to stop just before OBSTACLE', ->
    deltaCoreState(coreState, 'UP').should.have
      .property('movement').deepEqual
        from: row: 2, col: 0
        to: row: 0, col: 0

  it 'tells PLAYER to stop just before board limits', ->
    deltaCoreState(coreState, 'RIGHT').should.have
      .property('movement').deepEqual
        from: row: 2, col: 0
        to: row: 2, col: 2

  it 'produces empty delta when nothing changes', ->
    deltaCoreState(coreState, 'DOWN').should.deepEqual {}
    deltaCoreState(coreState, 'LEFT').should.deepEqual {}
