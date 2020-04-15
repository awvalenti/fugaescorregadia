type TestSpec = Internal | Leaf

type Internal = {
  [key: string]: TestSpec
}

type Leaf = {
  arrange?: () => any
  act?: (arg0: any) => any
  assert: { [key: string]: (arg0: any) => void }
  after?: (arg0: any) => void
}

function __a3(
  sut: string,
  node: TestSpec,
) {
  describe(sut, () => {
    const isLeaf = (n: TestSpec): n is Leaf => 'assert' in n

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
  testSpec: TestSpec
) {
  __a3(sut.name, testSpec)
}

export function a3<Sut extends Function>(
  sut: Sut,
  testSpec: TestSpec,
): void

export function a3<Sut extends Function, TestCase>(
  sut: Sut,
  testCases: TestCase[],
  testCaseToTestSpecification: (arg0: TestCase) => TestSpec,
): void

export function a3<Sut extends Function, TestCase>(
  sut: Sut,
  testSpecOrTestCases: TestSpec | TestCase[],
  testSpecFactory?: (arg0: TestCase) => TestSpec,
) {
  _a3(sut, testSpecFactory === undefined
    ? testSpecOrTestCases as TestSpec
    : Object.assign({}, ...(testSpecOrTestCases as TestCase[]).map(testSpecFactory))
  )
}
