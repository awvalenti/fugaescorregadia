import { expect } from 'chai'
import { GOAL, PLAYER } from '../TileId'
import LevelFactory from './LevelFactory'
import LevelModel from './LevelModel'
import LevelValidator from './LevelValidator'
import { INVALID_LEVEL } from './private/Error'
import LevelParser from './private/LevelParser'

describe(LevelFactory.name, () => {

  const parser: LevelParser = {
    parse: levelAsString => levelAsString === 'p g' ? [[PLAYER, GOAL]] : [],
  }

  const successValidator: LevelValidator = {
    run: matrix => matrix[0][0] === PLAYER && matrix[0][1] === GOAL,
  }

  const errorValidator: LevelValidator = {
    run: matrix => !successValidator.run(matrix),
  }

  const arrange = (validator: LevelValidator) => new LevelFactory(parser, validator)

  const act = (f: LevelFactory) => f.create('p g')

  let factory: LevelFactory

  context('for valid level', () => {
    before(() => {
      factory = arrange(successValidator)
    })

    it('parses, validates and creates level from string', () => {
      expect(act(factory)).to.deep.equal(new LevelModel([
        [PLAYER, GOAL],
      ]))
    })
  })

  context('for invalid level', () => {
    before(() => {
      factory = arrange(errorValidator)
    })

    it(`throws ${INVALID_LEVEL}`, () => {
      expect(() => act(factory)).to.throw(INVALID_LEVEL)
    })
  })
})
