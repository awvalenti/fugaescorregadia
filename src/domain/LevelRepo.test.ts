import { expect } from 'chai'
import LevelModel from './LevelModel'
import LevelRepo from './LevelRepo'
import { EMPTY, OBSTACLE } from './TileId'

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
