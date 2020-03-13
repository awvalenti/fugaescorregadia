import { expect } from 'chai'
import { EMPTY, OBSTACLE } from '../TileId'
import LevelParser from './LevelParser'

describe(LevelParser.name, () => {
  context('for valid input', () => {
    it('converts string to tile matrix', () => {
      expect(new LevelParser().convert('- - - -\no o o o'))
        .to.deep.equal([
          [EMPTY, EMPTY, EMPTY, EMPTY],
          [OBSTACLE, OBSTACLE, OBSTACLE, OBSTACLE],
        ])
    })
  })

  context('for input containing invalid character', () => {
    it('throws error informing invalid character', () => {
      expect(() => new LevelParser().convert('- - - -\no o ? o'))
        .to.throw(Error, 'Invalid character: ?')
    })
  })
})
