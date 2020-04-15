import { expect } from 'chai'
import { instance, mock } from 'ts-mockito'
import { a3 } from '../../my-libs/a3'
import { myStub } from '../../my-libs/my-stub'
import LevelModel from './LevelModel'
import LevelRepo from './LevelRepo'
import LevelFactory from './private/LevelFactory'
import LevelLoader from './private/LevelLoader'

const level1234 = instance(mock(LevelModel))

a3(LevelRepo, {
  arrange: () =>
    new LevelRepo(
      myStub(LevelLoader, 'read', ['1234'], 'loaded-level'),
      myStub(LevelFactory, 'create', ['loaded-level'], level1234)
    ),
  act: repo => repo.get(1234),
  assert: {
    [`delegates loading to ${LevelLoader.name} and creating to ${LevelFactory.name}`]: result => {
      expect(result).to.equal(level1234)
    },
  },
})
