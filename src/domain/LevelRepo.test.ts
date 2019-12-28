import { expect } from 'chai'
import LevelModel from './LevelModel'
import LevelRepo from './LevelRepo'
import TileId from './TileId'

const { EMPTY, OBSTACLE } = TileId

describe(LevelRepo.name, () => {
  let repo: LevelRepo

  before(() => {
    repo = new LevelRepo
  })

  it('allows retrieving game levels', () => {
    expect(repo.get()).to.deep.equal(new LevelModel([
      [OBSTACLE, EMPTY, EMPTY, OBSTACLE],
      [EMPTY,    EMPTY, EMPTY, OBSTACLE],
    ]))
  })
})
