import { expect } from 'chai'
import { instance, mock, when } from 'ts-mockito'
import LevelFactory from './LevelFactory'
import LevelModel from './LevelModel'
import LevelRepo from './LevelRepo'
import LevelLoader from './private/LevelLoader'

describe(LevelRepo.name, () => {

  const level1234 = instance(mock(LevelModel))

  let repo: LevelRepo

  before(() => {
    const LevelLoaderMock = mock(LevelLoader)
    when(LevelLoaderMock.read('1234')).thenReturn('loaded-level')

    const LevelFactoryMock = mock(LevelFactory)
    when(LevelFactoryMock.create('loaded-level')).thenReturn(level1234)

    repo = new LevelRepo(instance(LevelLoaderMock), instance(LevelFactoryMock))
  })

  it('allows retrieving game levels by id', () => {
    expect(repo.get(1234)).to.equal(level1234)
  })
})
