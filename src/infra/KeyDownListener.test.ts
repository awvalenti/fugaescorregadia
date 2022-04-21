import sinon from 'sinon'
import { anything, instance, mock, verify } from 'ts-mockito'
import { LEFT } from '../domain/Direction'
import * as myBind from '../my-libs/my-bind'
import { a4, expect, Mooca } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller, { MoveDispatcher } from './Controller'
import KeyDownListener from './KeyDownListener'
import KeyMapper from './KeyMapper'

const arrange = () => {
  const
    MockMoveDispatcher = mock<MoveDispatcher>(Controller)

  return {
    MockMoveDispatcher,
    sut: new KeyDownListener(
      new KeyMapper(),
      instance(MockMoveDispatcher)
    ),
  }
}

a4(KeyDownListener, {

  constructor: {
    arrange: () => {
      const bindSpy = sinon.spy()
      const mooca = new Mooca()
      mooca.stub(myBind, bindSpy)
      return { bindSpy, mooca }
    },

    act: (arranged: {}) => ({
      ...arranged,
      sut: new KeyDownListener(
        {} as KeyMapper,
        {} as MoveDispatcher,
      ),
    }),

    assert: {
      [`binds ${nameof<KeyDownListener>('onKeyDown$')}`]:
        ({ bindSpy, sut }: any) => {
          expect(bindSpy).to.have.been.calledOnceWithExactly(sut, 'onKeyDown$')
        },
    },

    after: ({ mooca }: any) => {
      mooca.restore()
    },

  },

  [nameof<KeyDownListener>('onKeyDown$')]: {
    'when key is mapped': {
      arrange,

      act: arranged => {
        arranged.sut.onKeyDown$({ code: 'ArrowLeft' } as KeyboardEvent)
        return arranged
      },

      assert: {
        [`calls ${nameof<MoveDispatcher>('dispatchMove$')}`]:
          ({ MockMoveDispatcher }) => {
            verify(MockMoveDispatcher.dispatchMove$(anything())).once()
            verify(MockMoveDispatcher.dispatchMove$(LEFT)).called()
          },
      },
    },

    'when key is NOT mapped': {
      arrange,

      act: arranged => {
        arranged.sut.onKeyDown$({ code: 'ScrollLock' } as KeyboardEvent)
        return arranged
      },

      assert: {
        [`does NOT call ${nameof<MoveDispatcher>('dispatchMove$')}`]:
          ({ MockMoveDispatcher }) => {
            verify(MockMoveDispatcher.dispatchMove$(anything())).never()
          },
      },
    },
  },

})
