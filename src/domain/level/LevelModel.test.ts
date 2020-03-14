import { expect } from 'chai'
import { EMPTY, GOAL, OBSTACLE, PLAYER } from '../TileId'
import { NO_PLAYER } from './Error'
import LevelModel from './LevelModel'

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
        expect(new LevelModel([[EMPTY, PLAYER]]).playerPos).to.deep.equal(
          { row: 0, col: 1 })
      })
    })

    context('for invalid level', () => {
      it(`throws ${NO_PLAYER}`, () => {
        expect(() => new LevelModel([]).playerPos).to.throw(NO_PLAYER)
      })
    })
  })

  describe('#background', () => {
    it('returns tile matrix without sprites', () => {
      expect(new LevelModel([[EMPTY, PLAYER], [OBSTACLE, GOAL]]).background)
        .to.deep.equal([[EMPTY, EMPTY], [OBSTACLE, GOAL]])
    })
  })

})
