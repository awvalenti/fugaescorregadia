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
      arrange: () => newSut(<Level>{
        playerPos: { row: 1, col: 2 },
      }),

      act: sut => sut.playerPos,

      assert: {
        'returns playerPos from level': result => {
          expect(result).to.deep.equal({ row: 1, col: 2 })
        },
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
          act: gameState => gameState.movePlayer(direction),
          assert: {
            'stops player just before it': result => {
              expect(result).to.deep.equal({ row, col })
            },
          },
        },
      },
    })),
  },
})
