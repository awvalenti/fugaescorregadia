export function a3(sut: Function, testSpecification: any) {
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
