import { expect } from 'chai'
import LevelModel from './LevelModel'
import { EMPTY, OBSTACLE } from './TileId'

describe(LevelModel.name, () => {
  const [ooee1, ooee2, ee, oo] = [
      [[OBSTACLE, OBSTACLE], [EMPTY, EMPTY]],
      [[OBSTACLE, OBSTACLE], [EMPTY, EMPTY]],
      [[EMPTY, EMPTY]],
      [[OBSTACLE, OBSTACLE]],
  ].map(tileMatrix => new LevelModel(tileMatrix))

  it('deep equals an equal object', () => {
    expect(ooee1).to.deep.equal(ooee2)
  })

  it('does not deep equal a different object', () => {
    expect(ee).not.to.deep.equal(oo)
  })
})
