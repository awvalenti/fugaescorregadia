import { expect } from 'chai'
import { a3, each } from '../../../my-libs/a3'
import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../../TileId'
import LevelValidator from './LevelValidator'

const testCases: [string, string, TileId[][]][] = [
  ['accepts', `one ${PLAYER} and one ${GOAL}`, [[PLAYER, GOAL], [OBSTACLE, EMPTY]]],
  ['rejects', 'no rows', []],
  ['rejects', 'no cols', [[]]],
  ['rejects', 'inconsistent cols count', [[PLAYER, GOAL], [OBSTACLE], [EMPTY, EMPTY]]],
  ['rejects', `no ${PLAYER}`, [[GOAL, EMPTY], [OBSTACLE, OBSTACLE]]],
  ['rejects', `more than one ${PLAYER}`, [[PLAYER, PLAYER], [GOAL, OBSTACLE]]],
  ['rejects', `no ${GOAL}`, [[PLAYER, EMPTY], [OBSTACLE, OBSTACLE]]],
  ['rejects', `more than one ${GOAL}`, [[GOAL, GOAL], [PLAYER, OBSTACLE]]],
]

a3(LevelValidator, {
  ...each(testCases, ([acceptsOrRejects, scenario, matrix]) => ({
    [`for ${scenario}`]: {
      arrange: () => new LevelValidator(),
      act: sut => sut.run(matrix),
      assert: {
        [`${acceptsOrRejects} level`]: result => {
          expect(result).to.equal(acceptsOrRejects === 'accepts')
        },
      },
    },
  })),
})
