import { expect } from 'chai'
import { a3, each } from '../../my-libs/a3'
import nameof from '../../my-libs/nameof'
import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../TileId'
import Level from './Level'
import { NO_PLAYER } from './private/Error'

const newSut = (matrix: TileId[][]) => new Level(matrix)

const level3x3 = newSut([
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
])

a3(Level, {
  'for valid level': {
    'deep equality': {
      'for equal objects': {
        arrange: () => ({
          instance1: newSut([[OBSTACLE, EMPTY]]),
          instance2: newSut([[OBSTACLE, EMPTY]]),
        }),
        assert: {
          'is true': ({ instance1, instance2 }) => {
            expect(instance1).to.deep.equal(instance2)
          },
        },
      },

      'for different objects': {
        arrange: () => ({
          instance1: newSut([[EMPTY, EMPTY]]),
          instance2: newSut([[OBSTACLE, OBSTACLE]]),
        }),
        assert: {
          'is false': ({ instance1, instance2 }) => {
            expect(instance1).not.to.deep.equal(instance2)
          },
        },
      },
    },

    '#playerPos': {
      arrange: () => newSut([[EMPTY, PLAYER]]),
      act: sut => sut.playerPos,
      assert: {
        'finds position of PLAYER': result => {
          expect(result).to.deep.equal({ row: 0, col: 1 })
        },
      },
    },

    '#background': {
      arrange: () => newSut([[EMPTY, PLAYER], [OBSTACLE, GOAL]]),
      act: sut => sut.background,
      assert: {
        'returns tile matrix without sprites': result => {
          expect(result).to.deep.equal([[EMPTY, EMPTY], [OBSTACLE, GOAL]])
        },
      },
    },

    [nameof(Level.prototype.inbounds)]: {
      ...each(<[string, number, number, boolean][]>[
        ['inside', 0, 0, true],
        ['inside', 2, 2, true],
        ['outside', -1, 0, false],
        ['outside', 0, -1, false],
        ['outside', 3, 2, false],
        ['outside', 2, 3, false],
      ], ([insideOrOutside, row, col, expectedResult]) => ({
        [`for position ${insideOrOutside} level`]: {
          arrange: () => level3x3,
          act: level => level.inbounds({ row, col }),
          assert: {
            [`should be ${expectedResult}`]: actualResult => {
              expect(actualResult).to.equal(expectedResult)
            },
          },
        },
      })),
    },

  },

  'for invalid level': {
    arrange: () => newSut([[]]),
    act: sut => () => sut.playerPos,
    assert: {
      [`throws ${NO_PLAYER}`]: fn => {
        expect(fn).to.throw(NO_PLAYER)
      },
    },
  },

})
