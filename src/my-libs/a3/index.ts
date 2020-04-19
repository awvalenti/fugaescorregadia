import nameof from '../nameof'

type TestSpec<Arranged, Acted> = Internal<Arranged, Acted> | Leaf<Arranged, Acted>

type Internal<Arranged, Acted> = {
  [key: string]: TestSpec<Arranged, Acted>
}

type Leaf<Arranged, Acted> = {
  arrange?: () => Arranged
  act?: (arg0: Arranged) => Acted
  assert: { [key: string]: (arg0: Acted) => void }
  after?: (arg0: Arranged) => void
}

type TestSpecAny = TestSpec<any, any>

const isLeaf = (n: TestSpecAny): n is Leaf<any, any> => 'assert' in n

function __a3(
  sut: string,
  node: TestSpecAny,
) {
  describe(sut, () => {
    if (isLeaf(node)) {
      const { arrange, act, assert, after: afterBlock } = node

      let arranged: any, acted: any

      if (arrange || act) before(() => {
        arranged = arrange && arrange()
        acted = act ? act(arranged) : arranged
      })

      Object.keys(assert).forEach(assertTitle => {
        const assertFn = assert[assertTitle]
        it(assertTitle, () => {
          assertFn(acted)
        })
      })

      if (afterBlock) after(() => afterBlock(arranged))

    } else {
      Object.keys(node).forEach(name => {
        __a3(name, node[name])
      })
    }
  })
}

function _a3<Sut extends Function>(
  sut: Sut,
  testSpec: TestSpecAny
) {
  __a3(nameof(sut), testSpec)
}

function privateA3<Sut extends Function, TestCase>(
  sut: Sut,
  testSpecOrTestCases: TestSpecAny | TestCase[],
  testSpecFactory?: (arg0: TestCase) => TestSpecAny,
) {
  _a3(sut, testSpecFactory === undefined
    ? testSpecOrTestCases as TestSpecAny
    : Object.assign({}, ...(testSpecOrTestCases as TestCase[]).map(testSpecFactory))
  )
}

export function a3<Sut extends Function>(
  sut: Sut,
  testSpec: TestSpecAny,
): void

export function a3<Sut extends Function, TestCase>(
  sut: Sut,
  testCases: TestCase[],
  testCaseToTestSpecification: (arg0: TestCase) => TestSpecAny,
): void

export function a3<Sut extends Function, TestCase>(
  sut: Sut,
  testSpecOrTestCases: TestSpecAny | TestCase[],
  testSpecFactory?: (arg0: TestCase) => TestSpecAny,
) {
  privateA3(sut, testSpecOrTestCases, testSpecFactory)
}

export const newA4 = <Sut extends Function>(sut: Sut) =>
  <Arranged, Acted, TestCase>(
    testSpecOrTestCases: TestSpec<Arranged, Acted> | TestCase[],
    testSpecFactory?: (arg0: TestCase) => TestSpec<Arranged, Acted>
  ) => privateA3(sut, testSpecOrTestCases, testSpecFactory)
