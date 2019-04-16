should = require 'should'

makeCoreModel = require '/prod/mvc/model/makeCoreModel'
deltaCoreModel = require('/prod/mvc/model/deltaCoreModel')
  loadLevelModel: null
  makeCoreModel: null

describe 'deltaCoreModel', ->
  context 'movement', ->
    coreModel = makeCoreModel 0, [
      ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
      ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'   ]
      ['START', 'EMPTY', 'EMPTY', 'OBSTACLE']
    ]

    it 'tells PLAYER to stop just before OBSTACLE', ->
      deltaCoreModel(coreModel, 'UP').should.have
        .property('movement').deepEqual
          from: row: 2, col: 0
          to: row: 0, col: 0

    it 'tells PLAYER to stop just before board limits', ->
      deltaCoreModel(coreModel, 'RIGHT').should.have
        .property('movement').deepEqual
          from: row: 2, col: 0
          to: row: 2, col: 2

    it 'produces empty delta when nothing changes', ->
      deltaCoreModel(coreModel, 'DOWN').should.deepEqual {}
      deltaCoreModel(coreModel, 'LEFT').should.deepEqual {}
