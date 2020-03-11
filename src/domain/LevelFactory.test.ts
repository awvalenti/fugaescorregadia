import { expect } from 'chai'
import LevelFactory from './LevelFactory'
import { EMPTY, OBSTACLE } from './TileId'

describe(LevelFactory.name, () => {
  context('for valid input', () => {
    it('converts string to tile matrix', () => {
      expect(new LevelFactory().convert('- - - -\no o o o'))
        .to.deep.equal([
          [EMPTY, EMPTY, EMPTY, EMPTY],
          [OBSTACLE, OBSTACLE, OBSTACLE, OBSTACLE],
        ])
    })
  })

  context('for input containing invalid character', () => {
    it('throws error informing invalid character', () => {
      expect(() => new LevelFactory().convert('- - - -\no o ? o'))
        .to.throw(Error, 'Invalid character: ?')
    })
  })
})
