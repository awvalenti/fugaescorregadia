import { expect } from 'chai'
import LevelLoader from './LevelLoader'

describe(LevelLoader.name, () => {
  context('for valid id', () => {
    it('loads level as string', () => {
      expect(new LevelLoader().read('00')).to.equal(`
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
      expect(() => new LevelLoader().read('9999'))
        .to.throw(Error, 'Invalid id: 9999')
    })
  })
})
