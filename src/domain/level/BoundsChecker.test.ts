import { a3, each, expect } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import BoundsChecker from './BoundsChecker'
import Level from './Level'

const level2x3 = { rowCount: 2, colCount: 3 } as Level

a3(BoundsChecker, {
  [nameof<BoundsChecker>('inbounds')]: {
    ...each(<[string, number, number, boolean][]>[
      ['outside', -1, 0, false],
      ['outside', 0, -1, false],
      ['outside', 1, 3, false],
      ['outside', 2, 0, false],
      ['inside', 0, 0, true],
      ['inside', 0, 1, true],
      ['inside', 0, 2, true],
      ['inside', 1, 0, true],
      ['inside', 1, 1, true],
      ['inside', 1, 2, true],
    ], ([insideOrOutside, row, col, expectedResult]) => ({
      [`for position ${insideOrOutside} level`]: {
        arrange: () => new BoundsChecker(),
        act: sut => sut.inbounds(level2x3, row, col),
        assert: {
          [`returns ${expectedResult}`]: actualResult => {
            expect(actualResult).to.equal(expectedResult)
          },
        },
      },
    })),
  },
})
