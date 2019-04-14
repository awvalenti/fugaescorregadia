should = require 'should'

makeCoreState = require '/app/core/makeCoreState.coffee'

describe 'makeCoreState', ->
  coreState = makeCoreState 2, [
    ['EMPTY', 'EMPTY']
    ['START', 'EMPTY']
    ['EMPTY', 'EMPTY']
  ]

  it 'stores levelNumber', ->
    coreState.should.have.property('levelNumber').equal 2

  it 'finds PLAYER position', ->
    coreState.should.have.property('playerPos').deepEqual row: 1, col: 0
