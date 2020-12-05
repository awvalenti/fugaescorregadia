import sinon from 'sinon'
import { RIGHT } from '../domain/Direction'
import GameState from '../domain/GameState'
import * as myBind from '../my-libs/my-bind'
import { myStub } from '../my-libs/my-stub'
import { a3, expect, Mooca } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller, { NextGameStateFn } from './Controller'

a3(Controller, {

  constructor: {
    arrange: () => {
      const mooca = new Mooca()
      const bindSpy = sinon.spy()
      mooca.stub(myBind, bindSpy)
      return { bindSpy, mooca }
    },

    act: (arranged: {}) => ({
      ...arranged,
      sut: new Controller(),
    }),

    assert: {
      [`binds ${nameof(Controller.prototype.moveFinished$)}`]:
      ({ sut, bindSpy }: any) => {
        expect(bindSpy).to.have.been.calledOnceWithExactly(sut, 'moveFinished$')
      },
    },
  },

  [nameof(Controller.prototype.dispatchMove$)]: {
    'when updateGameStateFn is NOT set': {
      arrange: () => new Controller(),
      act: sut => () => sut.dispatchMove$(RIGHT),
      assert: {
        'does NOT throw error': fn => {
          expect(fn).not.to.throw()
        },
      },
    },

    'when updateGameStateFn is set': {
      arrange: () => {
        const
          final = {} as GameState,
          initial = myStub(GameState, 'movePlayer', [RIGHT], final),
          ref: {current?: GameState} = {}

        const sut = new Controller()

        sut.setUpdateGameStateFn$((next: NextGameStateFn) => {
          ref.current = next(initial)
        })

        return { sut, ref, final }
      },

      act: ({ sut, ref, final }) => {
        sut.dispatchMove$(RIGHT)
        return { actual: ref.current, expected: final }
      },

      assert: {
        [`updates ${nameof(GameState)} using ${nameof(GameState.prototype
          .movePlayer)}`]: ({ actual, expected }) => {
          expect(actual).to.equal(expected)
        },
      },
    },
  },

})
