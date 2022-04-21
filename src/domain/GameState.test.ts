import { expect } from 'chai'
import { a3, each } from '../my-libs/a3'
import nameof from '../my-libs/nameof'
import { DOWN, LEFT, RIGHT, UP } from './Direction'
import GameState from './GameState'
import Level from './level/Level'
import LevelFactory from './level/private/LevelFactory'
import LevelParser from './level/private/LevelParser'
import LevelValidator from './level/private/LevelValidator'

const newLevel = (levelAsString: string) => new LevelFactory(
  new LevelParser(), new LevelValidator()).create(levelAsString)

const levels = {
  obstacle: newLevel(`
- - - - - - - - -
- - - - o - - - -
- - - - - - - - -
- - - - - - - - -
- o - - p - - o -
- - - - - - - - -
- - - - - - - - -
- - - - o - - g -
- - - - - - - - -
`
  ),

  border: newLevel(`
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - p - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - g -
- - - - - - - - -
`
  ),
}

const newSut = (level: Level) =>
  new GameState(level)

a3(GameState, {
  [`${nameof<GameState>('playerPos')}`]: {
    'when not specified via constructor': {
      arrange: () => newSut({ playerPos: { row: 1, col: 2 } } as Level),
      act: sut => sut.playerPos,
      assert: {
        [`is taken from ${nameof<GameState>('level')}`]: result => {
          expect(result).to.deep.equal({ row: 1, col: 2 })
        },
      },
    },
  },

  [`${nameof<GameState>('level')}`]: {
    arrange: () => {
      const expected = {} as Level
      return { sut: newSut(expected), expected }
    },

    act: ({ sut, expected }) => ({ actual: sut.level, expected }),

    assert: {
      'is stored by constructor': ({ actual, expected }) => {
        expect(actual).to.equal(expected)
      },
    },
  },

  [nameof<GameState>('movePlayer')]: {
    'for one move': {
      ...each([
        ['obstacle', LEFT, 4, 2],
        ['obstacle', UP, 2, 4],
        ['obstacle', RIGHT, 4, 6],
        ['obstacle', DOWN, 6, 4],
        ['border', LEFT, 4, 0],
        ['border', UP, 0, 4],
        ['border', RIGHT, 4, 8],
        ['border', DOWN, 8, 4],
      ] as const, ([object, direction, row, col]) => ({
        [`when ${object} is found going ${direction}`]: {
          arrange: () => newSut(levels[object]),
          act: sut => ({ initialState: sut, finalState: sut.movePlayer(direction) }),
          assert: {
            [`produces another ${nameof(GameState)}`]: ({ finalState }) => {
              expect(finalState).to.be.instanceof(GameState)
            },

            'reuses the level': ({ initialState, finalState }) => {
              expect(finalState.level).to.equal(initialState.level)
            },

            'stops player just before': ({ finalState }) => {
              expect(finalState.playerPos).to.deep.equal({ row, col })
            },

          },
        },
      })),
    },

    'for a sequence of moves': {
      arrange: () => newSut(levels.obstacle),

      act: sut => [DOWN, RIGHT, UP, LEFT].reduce(
        (ret, direction) => ret.movePlayer(direction), sut),

      assert: {
        'ends up on final destination': sut => {
          expect(sut.playerPos).to.deep.equal({ row: 0, col: 0 })
        },
      },
    },
  },

})
