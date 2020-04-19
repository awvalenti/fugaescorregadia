import { expect } from 'chai'
import { newA4 } from '../my-libs/a3'
import GameState from './GameState'
import LevelFactory from './level/private/LevelFactory'
import LevelParser from './level/private/LevelParser'
import LevelValidator from './level/private/LevelValidator'
import Position from './Position'

const a4 = newA4(GameState)

const newLevel = (levelAsString: string) =>
  new LevelFactory(new LevelParser(), new LevelValidator()).create(levelAsString)

const LEFT = 'LEFT'
const UP = 'UP'
const RIGHT = 'RIGHT'
const DOWN = 'DOWN'

type Direction='LEFT'|'UP'|'RIGHT'|'DOWN'

const testCases1: [Direction, number, number][] = [
  [LEFT, 4, 2],
  [UP, 2, 4],
  [RIGHT, 4, 6],
  [DOWN, 6, 4],
]

const testCases2: [Direction, number, number][] = [
  [LEFT, 4, 0],
  [UP, 0, 4],
  [RIGHT, 4, 8],
  [DOWN, 8, 4],
]

const obstacleLevel = newLevel(
  `- - - - - - - - -
- - - - o - - - -
- - - - - - - - -
- - - - - - - - -
- o - - p - - o -
- - - - - - - - -
- - - - - - - - -
- - - - o - - - g
- - - - - - - - -`
)

const borderLevel = newLevel(
  `- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - -
- - - - p - - - -
- - - - - - - - -
- - - - - - - - -
- - - - - - - - g
- - - - - - - - -`
)

a4({
  [GameState.newPos.name]: {
    ...testCases1.reduce((ret, [direction, row, col]) => ({
      ...ret,
      [`when an obstacle is found in the way ${direction}`]: {
        arrange: () => obstacleLevel,
        act: level => GameState.newPos(level, direction),
        assert: {
          'moves player until before the obstacle': (result: Position) => {
            expect(result).to.deep.equal({ row, col })
          },
        },
      },
    }), {}),

    ...testCases2.reduce((ret, [direction, row, col]) => ({
      ...ret,
      [`when a border is found in the way ${direction}`]: {
        arrange: () => borderLevel,
        act: level => GameState.newPos(level, direction),
        assert: {
          'moves player until before the border': (result: Position) => {
            expect(result).to.deep.equal({ row, col })
          },
        },
      },
    }), {}),
  },
})
