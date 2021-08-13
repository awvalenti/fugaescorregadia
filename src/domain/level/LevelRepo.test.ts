import { expect } from 'chai'
import { a3 } from '../../my-libs/a3'
import { myStub } from '../../my-libs/my-stub'
import nameof from '../../my-libs/nameof'
import Level from './Level'
import LevelRepo from './LevelRepo'
import LevelFactory from './private/LevelFactory'
import LevelFileReader from './private/LevelFileReader'

const level1234 = {} as Level

a3(LevelRepo, {

  arrange: () =>
    new LevelRepo(
      myStub(LevelFileReader, 'read', [1234], 'loaded-level'),
      myStub(LevelFactory, 'create', ['loaded-level'], level1234)
    ),

  act: repo => repo.get(1234),

  assert: {
    [`delegates loading to ${nameof(LevelFileReader)} and creating to \
    ${nameof(LevelFactory)}`]: result => {
      expect(result).to.equal(level1234)
    },
  },

})
