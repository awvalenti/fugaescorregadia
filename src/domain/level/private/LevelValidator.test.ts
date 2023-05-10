import { expect } from 'chai'
import { a4, each } from '../../../my-libs/a4'
import { EMPTY, GOAL, OBSTACLE, PLAYER, TileMatrix } from '../../Tile'
import LevelValidator from './LevelValidator'

const testCases: [string, string, TileMatrix][] = [
  ['accepts', `one ${PLAYER} and one ${GOAL}`, [[PLAYER, GOAL], [OBSTACLE, EMPTY]]],
  ['rejects', 'no rows', []],
  ['rejects', 'no cols', [[]]],
  ['rejects', 'inconsistent cols count', [[PLAYER, GOAL], [OBSTACLE], [EMPTY, EMPTY]]],
  ['rejects', `no ${PLAYER}`, [[GOAL, EMPTY], [OBSTACLE, OBSTACLE]]],
  ['rejects', `more than one ${PLAYER}`, [[PLAYER, PLAYER], [GOAL, OBSTACLE]]],
  ['rejects', `no ${GOAL}`, [[PLAYER, EMPTY], [OBSTACLE, OBSTACLE]]],
  ['rejects', `more than one ${GOAL}`, [[GOAL, GOAL], [PLAYER, OBSTACLE]]],
]

a4(LevelValidator, {
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
