import nameof from '../nameof'

type TestSpec<Arranged, Acted> =
  Internal<Arranged, Acted> | Leaf<Arranged, Acted>

type Internal<Arranged, Acted> = {
  [key: string]: TestSpec<Arranged, Acted>
}

type Assert<Acted> = { [key: string]: (arg0: Acted) => void }

type Leaf<Arranged, Acted> = {
  arrange?: () => Arranged
  act?: (arg0: Arranged) => Acted
  after?: (arg0: Arranged) => void
} & (
  { assert: Assert<Acted> }
  |
  { xassert: Assert<Acted> }
)

const isLeaf = <Arranged, Acted>(n: TestSpec<Arranged, Acted>):
  n is Leaf<Arranged, Acted> => 'assert' in n || 'xassert' in n

function _a3<Arranged, Acted>(
  sut: string,
  nodeOrArray: TestSpec<Arranged, Acted> | TestSpec<Arranged, Acted>[],
) {
  // eslint-disable-next-line complexity
  describe(sut, () => {
    for (const node of Array.isArray(nodeOrArray) ? nodeOrArray : [nodeOrArray]) {
      if (isLeaf(node)) {
        const { arrange, act, after: afterBlock } = node

        let arranged: any, acted: any

        if (arrange || act) before(() => {
          arranged = arrange && arrange()
          acted = act ? act(arranged) : arranged
        })

        if ('xassert' in node) {
          Object.keys(node.xassert).forEach(title => {
            xit(title)
          })
        } else if ('assert' in node) {
          const { assert } = node
          Object.keys(assert).forEach(assertTitle => {
            const assertFn = assert[assertTitle]
            it(assertTitle, () => {
              assertFn(acted)
            })
          })
        }

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
  testSpec: TestSpec<any, any>
): void {
  _a3(nameof(sut), testSpec)
}

export const each = <TestCaseData>(
  testCases: TestCaseData[],
  testSpecFactory: (testCase: TestCaseData) => Internal<any, any>,
): TestSpec<any, any> => testCases.reduce((ret, testCase) => {
    const testSpec: any = testSpecFactory(testCase)
    Object.keys(testSpec).forEach(key => {
      if (!(key in ret)) ret[key] = []
      ret[key].push(testSpec[key])
    })
    return ret
  }, {} as any)
