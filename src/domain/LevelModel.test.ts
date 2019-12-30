import { expect } from 'chai'
import LevelModel from './LevelModel'
import { EMPTY, OBSTACLE, PLAYER } from './TileId'

describe(LevelModel.name, () => {

  const [ooee1, ooee2, ee, oo] = [
      [[OBSTACLE, OBSTACLE], [EMPTY, EMPTY]],
      [[OBSTACLE, OBSTACLE], [EMPTY, EMPTY]],
      [[EMPTY, EMPTY]],
      [[OBSTACLE, OBSTACLE]],
  ].map(tileMatrix => new LevelModel(tileMatrix))

  describe('equality', () => {
    it('deep equals an equal object', () => {
      expect(ooee1).to.deep.equal(ooee2)
    })

    it('does not deep equal a different object', () => {
      expect(ee).not.to.deep.equal(oo)
    })
  })

  describe('#playerPos', () => {
    context('for valid level', () => {
      it('finds position of PLAYER', () => {
        expect(new LevelModel([[EMPTY, PLAYER]])).to.have.deep.property(
          'playerPos', { row: 0, col: 1 })
      })
    })

    context('for invalid level', () => {
      it('returns null', () => {
        expect(new LevelModel([])).to.have.property('playerPos', null)
      })
    })
  })
})
