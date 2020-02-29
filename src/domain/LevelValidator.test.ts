import { expect } from 'chai'
import LevelValidator from './LevelValidator'
import { EMPTY, PLAYER, OBSTACLE, GOAL } from './TileId'

describe(LevelValidator.name, () => {

  const fixtures = {
    valid: [[PLAYER, GOAL], [OBSTACLE, EMPTY]],
    invalid: {
      nothing: [[]],
      noPlayer: [[GOAL, EMPTY], [OBSTACLE, OBSTACLE]],
      twoPlayers: [[PLAYER, PLAYER], [GOAL, OBSTACLE]],
      noGoal: [[PLAYER, EMPTY], [OBSTACLE, OBSTACLE]],
      twoGoals: [[GOAL, GOAL], [PLAYER, OBSTACLE]],
    },
  }

  let validator: LevelValidator

  before(() => {
    validator = new LevelValidator()
  })

  it('rejects level without tiles', () => {
    expect(validator.run(fixtures.invalid.nothing)).to.equal(false)
  })

  it('rejects level without PLAYER', () => {
    expect(validator.run(fixtures.invalid.noPlayer)).to.equal(false)
  })

  it('rejects level with more than one PLAYER', () => {
    expect(validator.run(fixtures.invalid.twoPlayers)).to.equal(false)
  })

  it('rejects level without GOAL', () => {
    expect(validator.run(fixtures.invalid.noGoal)).to.equal(false)
  })

  it('rejects level with more than one GOAL', () => {
    expect(validator.run(fixtures.invalid.twoGoals)).to.equal(false)
  })

  it('accepts level with exactly one PLAYER and one GOAL', () => {
    expect(validator.run(fixtures.valid)).to.equal(true)
  })

})
