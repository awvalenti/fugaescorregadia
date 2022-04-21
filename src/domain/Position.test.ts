import { expect } from 'chai'
import { a4, each } from '../my-libs/a4'
import nameof from '../my-libs/nameof'
import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'

a4(Position, {

  constructor: {
    act: () => new Position(1, 2),
    assert: {
      [`sets ${nameof<Position>('row')} and ${nameof<Position>('col')}`]:
        (p: Position) => {
          expect(p.row).to.equal(1)
          expect(p.col).to.equal(2)
        },
    },
  },

  [nameof<Position>('add')]: {
    arrange: () => ({ initial: new Position(2, 5), d: { rowInc: 1, colInc: -1 } as Direction }),
    act: ({ initial, d }) => initial.add(d),
    assert: {
      [`adds ${nameof<Position>('row')} and ${nameof<Position>('col')}`]:
        (final: Position) => {
          expect(final.row).to.equal(3)
          expect(final.col).to.equal(4)
        },
    },
  },

  equality: {
    ...each([
      ['equal', true, new Position(1, 2), new Position(1, 2)],
      ['equal', true, new Position(3, 4), new Position(3, 4)],
      ['not equal', false, new Position(1, 2), new Position(1, 3)],
      ['not equal', false, new Position(1, 2), new Position(4, 2)],
      ['not equal', false, new Position(1, 2), new Position(3, 4)],
    ] as const, ([equalOrNot, expectedResult, p1, p2]) => ({
      [`for ${equalOrNot} objects`]: {
        assert: {
          [`deep equality considers them ${equalOrNot}`]: () => {
            expect(p1)[expectedResult ? 'to' : 'not'].deep.equal(p2)
          },

          [`${nameof<Position>('equals')} considers them ${equalOrNot}`]: () => {
            expect(p1.equals(p2)).to.equal(expectedResult)
          },
        },
      },
    })),
  },

  [nameof<Position>('isInside')]: {
    ...each([
      ['inside', 0, 0, true],
      ['inside', 0, 1, true],
      ['inside', 0, 2, true],
      ['inside', 1, 0, true],
      ['inside', 1, 1, true],
      ['inside', 1, 2, true],
      ['outside', -1, 0, false],
      ['outside', 0, -1, false],
      ['outside', 1, 3, false],
      ['outside', 2, 0, false],
    ] as const, ([insideOrOutside, row, col, expectedResult]) => ({
      [`when ${insideOrOutside} level`]: {
        arrange: () => ({ level2x3: { rowCount: 2, colCount: 3 } as Level }),
        act: ({ level2x3 }) => new Position(row, col).isInside(level2x3),
        assert: {
          [`returns ${expectedResult}`]: actualResult => {
            expect(actualResult).to.equal(expectedResult)
          },
        },
      },
    })),
  },

})
