import { expect } from 'chai'
import { a3 } from '../../../my-libs/a3'
import LevelFileReader from './LevelFileReader'

const arrange = () => new LevelFileReader()

a3(LevelFileReader, {

  'for valid id': {
    arrange,
    act: sut => sut.read('00'),
    assert: {
      'loads level as string': result => {
        expect(result).to.include('p')
        expect(result).to.include('g')

        const
          firstLineBreak = 1,
          rowCount = 20,
          colCount = 20,
          charsPerTile = 2

        expect(result).to.have.length(
          firstLineBreak + charsPerTile * colCount * rowCount)
      },
    },
  },

  'for invalid id': {
    arrange,
    act: sut => () => sut.read('9999'),
    assert: {
      'throws error informing invalid id': fn => {
        expect(fn).to.throw(Error, 'Invalid id: 9999')
      },
    },
  },

})
