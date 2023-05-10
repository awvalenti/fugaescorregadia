import { expect } from 'chai'
import { a4 } from '../../my-libs/a4'
import nameof from '../../my-libs/nameof'
import { EMPTY, GOAL, OBSTACLE, PLAYER, TileMatrix } from '../Tile'
import Level from './Level'
import { NO_PLAYER } from './private/Error'

const newSut = (matrix: TileMatrix) => new Level(matrix)

a4(Level, {
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

    [`${nameof<Level>('rowCount')}`]: {
      arrange: () => newSut([[EMPTY, PLAYER], [EMPTY, EMPTY], [EMPTY, EMPTY]]),
      act: sut => sut.rowCount,
      assert: {
        'returns amount of rows': result => {
          expect(result).to.equal(3)
        },
      },
    },

    [`${nameof<Level>('colCount')}`]: {
      arrange: () => newSut([[EMPTY, PLAYER], [EMPTY, EMPTY], [EMPTY, EMPTY]]),
      act: sut => sut.colCount,
      assert: {
        'returns amount of cols': result => {
          expect(result).to.equal(2)
        },
      },
    },

    [`${nameof<Level>('playerPos')}`]: {
      arrange: () => newSut([[EMPTY, PLAYER]]),
      act: sut => sut.playerPos,
      assert: {
        'finds position of PLAYER': result => {
          expect(result).to.deep.equal({ row: 0, col: 1 })
        },
      },
    },

    [`${nameof<Level>('background')}`]: {
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
