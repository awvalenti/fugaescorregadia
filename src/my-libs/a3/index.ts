type TestSpec = {
  [key: string]: {
    arrange: () => any
    act: (arg0: any) => any
    assert: {
      [key: string]: (arg0: any) => void
    }
  }
}

function _a3<T>(sut: new (...args: any) => T, testSpec: TestSpec) {
  describe(sut.name, () => {
    Object.keys(testSpec).forEach(ctx => {
      const { arrange, act, assert } = testSpec[ctx]

      context(ctx, () => {
        let acted: any
        before(() => {
          const arranged = arrange()
          acted = act(arranged)
        })

        Object.keys(assert).forEach(assertTitle => {
          const assertFn = assert[assertTitle]
          it(assertTitle, () => {
            assertFn(acted)
          })
        })
      })
    })
  })
}

export function a3<Sut>(
  sut: new (...args: any) => Sut,
  testSpec: TestSpec,
): void

export function a3<Sut, TestCase>(
  sut: new (...args: any) => Sut,
  testCases: TestCase[],
  testCaseToTestSpecification: (arg0: TestCase) => TestSpec,
): void

export function a3<Sut, TestCase>(
  sut: new (...args: any) => Sut,
  testSpecOrTestCases: TestSpec | TestCase[],
  testSpecFactory?: (arg0: TestCase) => TestSpec,
) {
  // Using local variable to avoid inline typecast, which
  // would cause a bug in eslint. See:
  // https://github.com/eslint/eslint/issues/13159
  const testCases = testSpecOrTestCases as TestCase[]

  _a3(sut, testSpecFactory === undefined
    ? testSpecOrTestCases
    : Object.assign({}, ...testCases.map(testSpecFactory))
  )
}
