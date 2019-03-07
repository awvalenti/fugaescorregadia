should = require 'should'

updateGameModel = require '/model/updateGameModel.coffee'

describe 'updateGameModel', ->
  gameModel = null

  beforeEach ->
    gameModel =
      boardModel: null
      playerPos: {x: 0, y: 0}

  it 'increments playerPos', ->
    updateGameModel(gameModel, 'down').should.have
      .property('playerPos').deepEqual {x: 0, y: 1}
