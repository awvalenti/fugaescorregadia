import { expect } from 'chai'
import { a3 } from '../../../my-libs/a3'
import LevelLoader from './LevelLoader'

const newSut = () => new LevelLoader()

a3(LevelLoader, {
  'for valid id': {
    arrange: newSut,
    act: sut => sut.read('00'),
    assert: {
      'loads level as string': result => {
        expect(result).to.equal(`
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
`)
      },
    },
  },
  'for invalid id': {
    arrange: newSut,
    act: sut => () => sut.read('9999'),
    assert: {
      'throws error informing invalid character': fn => {
        expect(fn).to.throw(Error, 'Invalid id: 9999')
      },
    },
  },
})
