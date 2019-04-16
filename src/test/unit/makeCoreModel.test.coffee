should = require 'should'

makeCoreModel = require '/prod/mvc/model/makeCoreModel'

describe 'makeCoreModel', ->
  levelModel = [
    ['EMPTY', 'EMPTY']
    ['START', 'EMPTY']
    ['EMPTY', 'EMPTY']
  ]
  coreModel = makeCoreModel 1, levelModel

  it 'stores levelNumber', ->
    coreModel.should.have.property('levelNumber').equal 1

  it 'stores levelModel', ->
    coreModel.should.have.property('levelModel').deepEqual levelModel

  it 'finds PLAYER position', ->
    coreModel.should.have.property('playerPos').deepEqual row: 1, col: 0
