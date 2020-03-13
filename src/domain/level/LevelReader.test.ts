import { expect } from 'chai'
import LevelReader from './LevelReader'

describe(LevelReader.name, () => {
  context('for valid id', () => {
    it('reads level as string', () => {
      expect(new LevelReader().read('00')).to.equal(`
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - -
`
      )
    })
  })

  context('for invalid id', () => {
    it('throws error informing invalid character', () => {
      expect(() => new LevelReader().read('9999'))
        .to.throw(Error, 'Invalid id: 9999')
    })
  })
})
