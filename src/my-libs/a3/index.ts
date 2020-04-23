import nameof from '../nameof'

type TestSpec<Arranged, Acted> =
  Internal<Arranged, Acted> | Leaf<Arranged, Acted>

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

function _a3(
  sut: string,
  nodeOrArray: TestSpecAny | TestSpecAny[],
) {
  // eslint-disable-next-line complexity
  describe(sut, () => {
    for (const node of Array.isArray(nodeOrArray) ? nodeOrArray : [nodeOrArray]) {
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
          _a3(name, node[name])
        })
      }
    }
  })
}

export function a3<Sut extends Function>(
  sut: Sut,
  testSpec: TestSpecAny
): void {
  _a3(nameof(sut), testSpec)
}

export const each = <TestCaseData>(
  testCases: TestCaseData[],
  testSpecFactory: (testCase: TestCaseData) => TestSpecAny,
): TestSpecAny => testCases.reduce((ret, testCase) => {
    const testSpec: any = testSpecFactory(testCase)
    Object.keys(testSpec).forEach(key => {
      if (!(key in ret)) ret[key] = []
      ret[key].push(testSpec[key])
    })
    return ret
  }, {} as any)
