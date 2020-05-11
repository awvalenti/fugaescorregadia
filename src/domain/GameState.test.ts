import { expect } from 'chai'
import { a3 } from '../my-libs/a3'
import { myStub } from '../my-libs/my-stub'
import nameof from '../my-libs/nameof'
import { DOWN, LEFT, RIGHT, UP } from './Direction'
import GameState from './GameState'
import BoundsChecker from './level/BoundsChecker'
import Level from './level/Level'
import LevelFactory from './level/private/LevelFactory'
import LevelParser from './level/private/LevelParser'
import LevelValidator from './level/private/LevelValidator'
import Mover from './Mover'
import Position from './Position'

const newLevel = (levelAsString: string) => new LevelFactory(
  new LevelParser(), new LevelValidator()).create(levelAsString)

const newSut = (level: Level, mover: Mover = new Mover(new BoundsChecker())) =>
  new GameState(level, mover)

a3(GameState, {
  playerPos: {
    'when not specified via constructor': {
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
    'for one move': {
      arrange: () => {
        const
          initialPos = { initial: 'pos' } as unknown as Position,
          level = { playerPos: initialPos } as Level,
          moverResult = { final: 'pos' } as unknown as Position,
          mover = myStub(Mover, 'move', [level, initialPos, RIGHT], moverResult)

        return { initialState: newSut(level, mover), moverResult }
      },

      act: ({ initialState, moverResult }) => ({
        initialState,
        finalState: initialState.movePlayer(RIGHT),
        moverResult,
      }),

      assert: {
        [`produces another ${nameof(GameState)}`]: ({ finalState }) => {
          expect(finalState).to.be.instanceof(GameState)
        },

        'reuses the level': ({ initialState, finalState }) => {
          expect(finalState.level).to.equal(initialState.level)
        },

        [`delegates to ${nameof(Mover)}`]: ({ finalState, moverResult }) => {
          expect(finalState.playerPos).to.equal(moverResult)
        },
      },
    },

    'for a sequence of moves': {
      arrange: () => newSut(newLevel(`
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
      )),

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
