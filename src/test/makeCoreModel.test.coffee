should = require 'should'

makeCoreModel = require '/app/core/makeCoreModel.coffee'

describe 'makeCoreModel', ->
  coreModel = makeCoreModel 2, [
    ['EMPTY', 'EMPTY']
    ['START', 'EMPTY']
    ['EMPTY', 'EMPTY']
  ]

  it 'stores levelNumber', ->
    coreModel.should.have.property('levelNumber').equal 2

  it 'finds PLAYER position', ->
    coreModel.should.have.property('playerPos').deepEqual row: 1, col: 0
