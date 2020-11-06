import sinon from 'sinon'
import { anything, instance, mock, verify } from 'ts-mockito'
import { LEFT } from '../domain/Direction'
import { a3, expect } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller from './Controller'
import KeyDownListener from './KeyDownListener'
import KeyMapper from './KeyMapper'

const arrange = () => {
  const
    MockController = mock(Controller)

  return {
    MockController,
    sut: new KeyDownListener(
      new KeyMapper(),
      instance(MockController)
    ),
  }
}

a3(KeyDownListener, {

  constructor: {
    arrange: () => ({
      // @ts-expect-error: @types/sinon does not include this overload
      bindSpy: sinon.spy(KeyDownListener.prototype.onKeyDown$, 'bind'),
    }),

    act: ({ bindSpy }: any) => ({
      bindSpy,
      sut: new KeyDownListener(
        {} as KeyMapper,
        {} as Controller,
      ),
    }),

    assert: {
      [`binds ${nameof(KeyDownListener.prototype.onKeyDown$)}`]:
      ({ bindSpy, sut }: any) => {
        expect(bindSpy).to.have.been.calledOnceWithExactly(sut)
      },
    },

    after: ({ bindSpy }: any) => {
      bindSpy.restore()
    },

  },

  [nameof(KeyDownListener.prototype.onKeyDown$)]: {
    'when key is mapped': {
      arrange,

      act: arranged => {
        arranged.sut.onKeyDown$({ code: 'ArrowLeft' } as KeyboardEvent)
        return arranged
      },

      assert: {
        [`calls ${nameof(Controller.prototype.dispatchMove$)}`]:
        ({ MockController }) => {
          verify(MockController.dispatchMove$(anything())).once()
          verify(MockController.dispatchMove$(LEFT)).called()
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
        [`does NOT call ${nameof(Controller.prototype.dispatchMove$)}`]:
        ({ MockController }) => {
          verify(MockController.dispatchMove$(anything())).never()
        },
      },
    },
  },

})
