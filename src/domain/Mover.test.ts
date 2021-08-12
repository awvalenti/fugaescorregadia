import { expect } from 'chai'
import { a3, each } from '../my-libs/a3'
import nameof from '../my-libs/nameof'
import Direction, { DOWN, LEFT, RIGHT, UP } from './Direction'
import LevelFactory from './level/private/LevelFactory'
import LevelParser from './level/private/LevelParser'
import LevelValidator from './level/private/LevelValidator'
import Mover from './Mover'

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
- - - - - - - g -
- - - - - - - - -
`
  ),
}

const newSut = () => new Mover()

a3(Mover, {
  [nameof<Mover>('move')]: {
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
          arrange: () => {
            const level = levels[object]
            return { sut: newSut(), level }
          },
          act: ({ sut, level }) => sut.move(level, level.playerPos, direction),
          assert: {
            [`stops player just before the ${object}`]: result => {
              expect(result).to.deep.equal({ row, col })
            },
          },
        },
      },
    })),
  },
})
