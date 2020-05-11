import { expect } from 'chai'
import { a3 } from '../../my-libs/a3'
import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../TileId'
import Level from './Level'
import { NO_PLAYER } from './private/Error'

const newSut = (matrix: TileId[][]) => new Level(matrix)

a3(Level, {
  'for invalid level': {
    act: () => () => newSut([[]]),
    assert: {
      [`throws ${NO_PLAYER}`]: fn => {
        expect(fn).to.throw(NO_PLAYER)
      },
    },
  },

  'for valid level': {
    'deep equality': {
      'for equal objects': {
        arrange: () => ({
          instance1: newSut([[PLAYER, GOAL]]),
          instance2: newSut([[PLAYER, GOAL]]),
        }),
        assert: {
          'is true': ({ instance1, instance2 }) => {
            expect(instance1).to.deep.equal(instance2)
          },
        },
      },

      'for different objects': {
        arrange: () => ({
          instance1: newSut([[GOAL, PLAYER]]),
          instance2: newSut([[PLAYER, GOAL]]),
        }),
        assert: {
          'is false': ({ instance1, instance2 }) => {
            expect(instance1).not.to.deep.equal(instance2)
          },
        },
      },
    },

    'rowCount': {
      arrange: () => newSut([[EMPTY, PLAYER], [EMPTY, EMPTY], [EMPTY, EMPTY]]),
      act: sut => sut.rowCount,
      assert: {
        'returns amount of rows': result => {
          expect(result).to.equal(3)
        },
      },
    },

    'colCount': {
      arrange: () => newSut([[EMPTY, PLAYER], [EMPTY, EMPTY], [EMPTY, EMPTY]]),
      act: sut => sut.colCount,
      assert: {
        'returns amount of cols': result => {
          expect(result).to.equal(2)
        },
      },
    },

    'playerPos': {
      arrange: () => newSut([[EMPTY, PLAYER]]),
      act: sut => sut.playerPos,
      assert: {
        'finds position of PLAYER': result => {
          expect(result).to.deep.equal({ row: 0, col: 1 })
        },
      },
    },

    'background': {
      arrange: () => newSut([[EMPTY, PLAYER], [OBSTACLE, GOAL]]),
      act: sut => sut.background,
      assert: {
        'returns tile matrix without sprites': result => {
          expect(result).to.deep.equal([[EMPTY, EMPTY], [OBSTACLE, GOAL]])
        },
      },
    },

  },

})
