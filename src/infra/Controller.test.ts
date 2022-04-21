import sinon from 'sinon'
import { DOWN, LEFT, RIGHT, UP } from '../domain/Direction'
import GameState from '../domain/GameState'
import * as myBind from '../my-libs/my-bind'
import { myStub } from '../my-libs/my-stub'
import { a4, expect, Mooca } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller, { NextGameStateFn } from './Controller'

const arrange = () => {
  const sut = new Controller()
  const updateSpy = sinon.spy()
  sut.setUpdateGameStateFn$(updateSpy)
  return { sut, updateSpy }
}

a4(Controller, {

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
      [`binds ${nameof<Controller>('updateFinished$')}`]:
        ({ sut, bindSpy }: any) => {
          expect(bindSpy).to.have.been.calledOnceWithExactly(sut, 'updateFinished$')
        },
    },
  },

  [nameof<Controller>('dispatchMove$')]: {
    [`when called before ${nameof<Controller>('setUpdateGameStateFn$')}`]: {
      arrange: () => new Controller(),
      act: sut => () => sut.dispatchMove$(RIGHT),
      assert: {
        'does NOT throw error': fn => {
          expect(fn).not.to.throw()
        },
      },
    },

    [`when called after ${nameof<Controller>('setUpdateGameStateFn$')}`]: {
      [`the update of ${nameof(GameState)}`]: {
        arrange: () => {
          const
            final = {} as GameState,
            initial = myStub(GameState, 'movePlayer', [RIGHT], final),
            ref: { current$?: GameState } = {}

          const sut = new Controller()

          const updateSpy = sinon.spy((next: NextGameStateFn) => {
            ref.current$ = next(initial)
          })
          sut.setUpdateGameStateFn$(updateSpy)

          return { sut, ref, final, updateSpy }
        },

        act: ({ sut, ref, final, updateSpy }) => {
          sut.dispatchMove$(RIGHT)
          return { actual: ref.current$, expected: final, sut, updateSpy }
        },

        assert: {
          [`happens by calling ${nameof<GameState>('movePlayer')}`]:
            ({ actual, expected }) => {
              expect(actual).to.equal(expected)
            },
        },
      },

      'for many sequential moves and subsequent finishes': {
        arrange,
        act: ({ sut, updateSpy }) => {
          sut.dispatchMove$(LEFT)
          sut.dispatchMove$(UP)
          sut.dispatchMove$(RIGHT)
          sut.dispatchMove$(DOWN)

          sut.updateFinished$()
          sut.updateFinished$()
          sut.updateFinished$()
          sut.updateFinished$()

          return { updateSpy }
        },
        assert: {
          'limits itself to dispatching first 3 moves': ({ updateSpy }) => {
            expect(updateSpy).to.have.callCount(3)
          },
        },
      },

      [`when ${nameof<Controller>('updateFinished$')} is`]: {
        'never called': {
          arrange,
          act: ({ sut, updateSpy }) => {
            sut.dispatchMove$(LEFT)
            sut.dispatchMove$(RIGHT)
            return { updateSpy }
          },
          assert: {
            'processes only the first move':
              ({ updateSpy }) => {
                expect(updateSpy).to.have.callCount(1)
              },
          },
        },

        'called once for each move': {
          arrange,
          act: ({ sut, updateSpy }) => {
            sut.dispatchMove$(LEFT)
            sut.dispatchMove$(RIGHT)
            sut.updateFinished$()
            sut.updateFinished$()
            return { updateSpy }
          },
          assert: {
            [`updates ${nameof(GameState)} once for each move`]:
              ({ updateSpy }) => {
                expect(updateSpy).to.have.callCount(2)
              },
          },
        },

        'called excessive times': {
          arrange,
          act: ({ sut, updateSpy }) => {
            sut.updateFinished$()
            sut.dispatchMove$(LEFT)
            sut.updateFinished$()
            sut.updateFinished$()
            return { updateSpy }
          },
          assert: {
            'ignores the extra calls': ({ updateSpy }) => {
              expect(updateSpy).to.have.callCount(1)
            },
          },
        },

      },
    },
  },
})
