import { expect } from 'chai'
import { EMPTY, GOAL, OBSTACLE, PLAYER } from '../TileId'
import LevelParser from './LevelParser'

describe(LevelParser.name, () => {
  context('for valid input', () => {
    it('converts string to tile matrix', () => {
      expect(new LevelParser().parse('- o g p\n- - - -'))
        .to.deep.equal([
          [EMPTY, OBSTACLE, GOAL, PLAYER],
          [EMPTY, EMPTY, EMPTY, EMPTY],
        ])
    })
  })

  context('for input containing invalid character', () => {
    it('throws error informing invalid character', () => {
      expect(() => new LevelParser().parse('- - - -\no o ? o'))
        .to.throw(Error, 'Invalid character: ?')
    })
  })
})
