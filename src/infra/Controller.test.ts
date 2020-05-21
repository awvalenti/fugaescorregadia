import { RIGHT } from '../domain/Direction'
import GameState from '../domain/GameState'
import { myStub } from '../my-libs/my-stub'
import { a3, expect } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller, { NextGameState } from './Controller'

a3(Controller, {

  [nameof(Controller.prototype.dispatchMove)]: {
    arrange: () => {
      const
        finalGameState = {} as GameState,

        initialGameState = myStub(GameState, 'movePlayer', [RIGHT],
          finalGameState),

        updatedGameStateRef: {current?: GameState} = {}

      return {
        sut: new Controller((next: NextGameState) => {
          updatedGameStateRef.current = next(initialGameState)
        }),
        updatedGameStateRef,
        finalGameState,
      }
    },

    act: ({ sut, updatedGameStateRef, finalGameState }) => {
      sut.dispatchMove(RIGHT)
      return { actual: updatedGameStateRef.current, expected: finalGameState }
    },

    assert: {
      [`updates ${nameof(GameState)} using ${nameof(GameState.prototype.movePlayer)}`]: ({
        actual,
        expected,
      }) => {
        expect(actual).to.equal(expected)
      },
    },
  },

})
