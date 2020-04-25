import { expect } from 'chai'
import { a3 } from '../../../my-libs/a3'
import { EMPTY, GOAL, OBSTACLE, PLAYER } from '../../TileId'
import LevelParser from './LevelParser'

const newSut = () => new LevelParser()

a3(LevelParser, {
  'for valid input': {
    arrange: newSut,
    act: sut => sut.parse('\n   \n\n  - o g p\n- - - -   \n\n \n  '),
    assert: {
      'converts string to tile matrix, ignoring outer spaces': result => {
        expect(result).to.deep.equal([
          [EMPTY, OBSTACLE, GOAL, PLAYER],
          [EMPTY, EMPTY, EMPTY, EMPTY],
        ])
      },
    },
  },

  'for invalid input': {
    arrange: newSut,
    act: sut => () => sut.parse('- - - -\no o ? o'),
    assert: {
      'throws error informing invalid character': fn => {
        expect(fn).to.throw(Error, 'Invalid character: "?"')
      },
    },
  },
})
