export function a3<T>(
  sut: (new (...args: any) => T),
  testSpecification: {
    [key: string]: {
      arrange: () => any
      act: (arg0: any) => any
      assert: {
        [key: string]: (arg0: any) => void
      }
    }
  }
) {
  describe(sut.name, () => {
    Object.keys(testSpecification).forEach(ctx => {
      const { arrange, act, assert } = testSpecification[ctx]

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
