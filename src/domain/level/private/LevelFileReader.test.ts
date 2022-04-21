import { expect } from 'chai'
import { a4, each } from '../../../my-libs/a4'
import LevelFileReader from './LevelFileReader'

const arrange = () => new LevelFileReader()

a4(LevelFileReader, {

  'for valid id': {
    arrange,
    act: sut => sut.read(1),
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

  ...each([-1, 0, 2, 9999], id => ({
    'for invalid id': {
      arrange,
      act: sut => () => sut.read(id),
      assert: {
        'throws error informing invalid id': fn => {
          expect(fn).to.throw(Error, `Invalid id: ${id}`)
        },
      },
    },
  })),

})
