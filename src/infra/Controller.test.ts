import sinon from 'sinon'
import { DOWN, LEFT, RIGHT, UP } from '../domain/Direction'
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
      [`binds ${nameof<Controller>('moveFinished$')}`]:
      ({ sut, bindSpy }: any) => {
        expect(bindSpy).to.have.been.calledOnceWithExactly(sut, 'moveFinished$')
      },
    },
  },

  [nameof<Controller>('dispatchMove$')]: {
    'before updateGameStateFn is set': {
      arrange: () => new Controller(),
      act: sut => () => sut.dispatchMove$(RIGHT),
      assert: {
        'does NOT throw error': fn => {
          expect(fn).not.to.throw()
        },
      },
    },

    'after updateGameStateFn is set': {
      arrange: () => {
        const
          final = {} as GameState,
          initial = myStub(GameState, 'movePlayer', [RIGHT], final),
          ref: {current?: GameState} = {}

        const sut = new Controller()

        const updateGameStateFnSpy = sinon.spy((next: NextGameStateFn) => {
          ref.current = next(initial)
        })
        sut.setUpdateGameStateFn$(updateGameStateFnSpy)

        return { sut, ref, final, updateGameStateFnSpy }
      },

      act: ({ sut, ref, final, updateGameStateFnSpy }) => {
        sut.dispatchMove$(RIGHT)
        return { actual: ref.current, expected: final, sut, updateGameStateFnSpy }
      },

      assert: {
        [`updates ${nameof(GameState)} using ${nameof<GameState>('movePlayer')}`]:
        ({ actual, expected }) => {
          expect(actual).to.equal(expected)
        },

        'enqueues up to three moves': ({ sut, updateGameStateFnSpy }) => {
          sut.moveFinished$()
          updateGameStateFnSpy.resetHistory()

          sut.dispatchMove$(LEFT)
          sut.dispatchMove$(UP)
          sut.dispatchMove$(RIGHT)
          sut.dispatchMove$(DOWN)

          sut.moveFinished$()
          sut.moveFinished$()
          sut.moveFinished$()
          sut.moveFinished$()

          expect(updateGameStateFnSpy).to.have.been.callCount(3)
        },

        [`processes enqueued moves when ${nameof<Controller>('moveFinished$')} is called`]:
        ({ sut, updateGameStateFnSpy }) => {
          updateGameStateFnSpy.resetHistory()

          sut.dispatchMove$(LEFT)
          sut.dispatchMove$(RIGHT)

          expect(updateGameStateFnSpy).to.have.been.callCount(1)

          sut.moveFinished$()
          expect(updateGameStateFnSpy).to.have.been.callCount(2)
        },

        [`ignores excessive ${nameof<Controller>('moveFinished$')} calls`]:
        ({ sut, updateGameStateFnSpy }) => {
          updateGameStateFnSpy.resetHistory()
          sut.moveFinished$()
          sut.dispatchMove$(LEFT)
          sut.moveFinished$()
          sut.moveFinished$()
          expect(updateGameStateFnSpy).to.have.been.callCount(1)
        },

      },

    },
  },

})
