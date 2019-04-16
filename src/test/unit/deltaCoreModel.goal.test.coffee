should = require 'should'

makeCoreModel = require '/prod/mvc/model/makeCoreModel'

coreModel = makeCoreModel 1, [
  ['START', 'EMPTY', 'GOAL', 'EMPTY']
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']
]

level2 = [
  ['EMPTY', 'GOAL', 'EMPTY', 'START']
]

deltaCoreModel = require('/prod/mvc/model/deltaCoreModel')
  loadLevelModel: (levelNumber) -> level2 if levelNumber is 2
  makeCoreModel: require '/prod/mvc/model/makeCoreModel'

describe 'deltaCoreModel', ->
  context 'when GOAL is reached', ->
    delta = deltaCoreModel coreModel, 'RIGHT'

    it 'moves PLAYER to GOAL position', ->
      delta.should.have.property('movement').deepEqual
        from: row: 0, col: 0
        to: row: 0, col: 2

    it 'stores a new coreModel with new level', ->
      delta.should.have.property('coreModelForNewLevel').deepEqual \
        makeCoreModel 2, level2

  context 'when GOAL is not reached', ->
    it 'does not include coreModelForNewLevel property', ->
      deltaCoreModel(coreModel, 'DOWN').should.not.have.property \
        'coreModelForNewLevel'
