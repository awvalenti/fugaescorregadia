import { a3, each, expect } from '../my-libs/my-testing-library'
import Direction, { DOWN, LEFT, RIGHT, UP } from './Direction'

a3(Direction, {

  ...each([
    [LEFT, 'LEFT', 0, -1],
    [UP, 'UP', -1, 0],
    [RIGHT, 'RIGHT', 0, 1],
    [DOWN, 'DOWN', 1, 0],
  ] as const, ([direction, name, rowInc, colInc]) => ({
    [name]: {
      assert: {
        'has correct rowInc': () => {
          expect(direction.rowInc).to.equal(rowInc)
        },

        'has correct colInc': () => {
          expect(direction.colInc).to.equal(colInc)
        },

        'gets converted correctly to string': () => {
          expect(`${direction}`).to.equal(name)
        },

      },
    },
  })),

})
