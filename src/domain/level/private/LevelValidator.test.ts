import { expect } from 'chai'
import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../../TileId'
import LevelValidator from './LevelValidator'

describe(LevelValidator.name, () => {

  const testCases: [string, string, TileId[][]][] = [
    ['accepts', `one ${PLAYER} and one ${GOAL}`, [[PLAYER, GOAL], [OBSTACLE, EMPTY]]],
    ['rejects', 'inconsistent cols count', [[PLAYER, GOAL], [OBSTACLE], [EMPTY, EMPTY]]],
    ['rejects', `no ${PLAYER}`, [[GOAL, EMPTY], [OBSTACLE, OBSTACLE]]],
    ['rejects', `more than one ${PLAYER}`, [[PLAYER, PLAYER], [GOAL, OBSTACLE]]],
    ['rejects', `no ${GOAL}`, [[PLAYER, EMPTY], [OBSTACLE, OBSTACLE]]],
    ['rejects', `more than one ${GOAL}`, [[GOAL, GOAL], [PLAYER, OBSTACLE]]],
  ]

  let validator: LevelValidator

  before(() => {
    validator = new LevelValidator()
  })

  testCases.forEach(([acceptsOrRejects, scenario, matrix]) => {
    it(`${acceptsOrRejects} level with ${scenario}`, () => {
      expect(validator.run(matrix)).to.equal(acceptsOrRejects === 'accepts')
    })
  })

})
