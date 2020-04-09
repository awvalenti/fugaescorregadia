import { expect } from 'chai'
import { a3 } from '../../my-libs/a3'
import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../TileId'
import LevelModel from './LevelModel'
import { NO_PLAYER } from './private/Error'

const newSut = (matrix: TileId[][]) => new LevelModel(matrix)

a3(LevelModel, {
  'for valid level': {
    'equality': {
      'for equal objects': {
        arrange: () => ({
          instance1: newSut([[OBSTACLE, EMPTY]]),
          instance2: newSut([[OBSTACLE, EMPTY]]),
        }),
        assert: {
          'does happen': ({ instance1, instance2 }) => {
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
          'does not happen': ({ instance1, instance2 }) => {
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
