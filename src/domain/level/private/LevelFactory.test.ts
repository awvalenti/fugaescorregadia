import { expect } from 'chai'
import { a3 } from '../../../my-libs/a3'
import { myStub } from '../../../my-libs/my-stub'
import { PLAYER } from '../../TileId'
import Level from '../Level'
import { INVALID_LEVEL } from './Error'
import LevelFactory from './LevelFactory'
import LevelParser from './LevelParser'
import LevelValidator from './LevelValidator'

const matrix = [[PLAYER]]

const newSut = (validator: LevelValidator) =>
  new LevelFactory(myStub(LevelParser, 'parse', ['my-level'], matrix), validator)

a3(LevelFactory, {
  'for valid level': {
    arrange: () => newSut(myStub(LevelValidator, 'run', [matrix], true)),
    act: sut => sut.create('my-level'),
    assert: {
      'parses, validates and creates level from string': result => {
        expect(result).to.deep.equal(new Level(matrix))
      },
    },
  },

  'for invalid level': {
    arrange: () => newSut(myStub(LevelValidator, 'run', [matrix], false)),
    act: sut => () => sut.create('my-level'),
    assert: {
      [`throws ${INVALID_LEVEL}`]: fn => {
        expect(fn).to.throw(INVALID_LEVEL)
      },
    },
  },
})
