import { expect } from 'chai'
import { a3, each } from '../my-libs/a3'
import nameof from '../my-libs/nameof'
import Direction, { DOWN, LEFT, RIGHT, UP } from './Direction'
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
- - - - o - - - -
- - - - - - - - g
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
- - - - - - - - g
- - - - - - - - -
`
  ),
}

const newSut = (level: Level) => new GameState(level)

a3(GameState, {
  playerPos: {
    initially: {
      arrange: () => newSut({ playerPos: { row: 1, col: 2 } } as Level),

      act: sut => sut.playerPos,

      assert: {
        'returns playerPos from level': result => {
          expect(result).to.deep.equal({ row: 1, col: 2 })
        },
      },
    },
  },

  level: {
    arrange: () => {
      const expected = {} as Level
      return { sut: newSut(expected), expected }
    },

    act: ({ sut, expected }) => ({ actual: sut.level, expected }),

    assert: {
      'returns level passed to constructor': ({ actual, expected }) => {
        expect(actual).to.equal(expected)
      },
    },
  },

  [nameof(GameState.prototype.movePlayer)]: {
    ...each(<[keyof typeof levels, Direction, number, number][]>[
      ['obstacle', LEFT, 4, 2],
      ['obstacle', UP, 2, 4],
      ['obstacle', RIGHT, 4, 6],
      ['obstacle', DOWN, 6, 4],
      ['border', LEFT, 4, 0],
      ['border', UP, 0, 4],
      ['border', RIGHT, 4, 8],
      ['border', DOWN, 8, 4],
    ], ([object, direction, row, col]) => ({
      [`when ${object} is found in the way`]: {
        [`going ${direction}`]: {

          arrange: () => newSut(levels[object]),

          act: gameState => ({
            original: gameState,
            modified: gameState.movePlayer(direction),
          }),

          assert: {
            [`returns another ${nameof(GameState)}`]: ({ modified }) => {
              expect(modified).to.be.instanceof(GameState)
            },

            'references the same level': ({ original, modified }) => {
              expect(modified.level).to.equal(original.level)
            },

            [`stops player just before the ${object}`]: ({ modified }) => {
              expect(modified.playerPos).to.deep.equal({ row, col })
            },

          },
        },
      },
    })),

    'after many moves heading to (0, 0)': {
      arrange: () => newSut(levels.obstacle),

      act: sut => [DOWN, RIGHT, UP, LEFT].reduce(
        (gameState, direction) => gameState.movePlayer(direction), sut),

      assert: {
        'ends up on (0, 0)': sut => {
          expect(sut.playerPos).to.deep.equal({ row: 0, col: 0 })
        },
      },
    },
  },
})
