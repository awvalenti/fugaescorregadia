import { expect } from 'chai'
import { instance, mock, when } from 'ts-mockito'
import { PLAYER } from '../TileId'
import LevelFactory from './LevelFactory'
import LevelModel from './LevelModel'
import { INVALID_LEVEL } from './private/Error'
import LevelParser from './private/LevelParser'
import LevelValidator from './private/LevelValidator'

describe(LevelFactory.name, () => {

  const matrix = [[PLAYER]]

  let factory: LevelFactory

  const arrange = (validator: LevelValidator) => {
    const LevelParserMock = mock(LevelParser)
    when(LevelParserMock.parse('my-level')).thenReturn(matrix)

    factory = new LevelFactory(instance(LevelParserMock), validator)
  }

  const act = () => factory.create('my-level')

  context('for valid level', () => {
    before(() => {
      const SuccessValidator = mock(LevelValidator)
      when(SuccessValidator.run(matrix)).thenReturn(true)

      arrange(instance(SuccessValidator))
    })

    it('parses, validates and creates level from string', () => {
      expect(act()).to.deep.equal(new LevelModel(matrix))
    })
  })

  context('for invalid level', () => {
    before(() => {
      const ErrorValidator = mock(LevelValidator)
      when(ErrorValidator.run(matrix)).thenReturn(false)

      arrange(instance(ErrorValidator))
    })

    it(`throws ${INVALID_LEVEL}`, () => {
      expect(() => act()).to.throw(INVALID_LEVEL)
    })
  })
})
