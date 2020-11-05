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
    arrange: () => {
      const originalBind = KeyDownListener.prototype.onKeyDown$.bind

      KeyDownListener.prototype.onKeyDown$.bind = function(thisArg: {}) {
        return { bound: 'method', thisArg } as any
      }

      return { originalBind }
    },

    act: ({ originalBind }: any) => ({
      sut: new KeyDownListener(
          {} as KeyMapper,
          {} as Controller,
      ),
      originalBind,
    }),

    assert: {
      [`binds ${nameof(KeyDownListener.prototype.onKeyDown$)}
      to this`]: ({ sut }: any) => {
        expect(sut.onKeyDown$).to.deep.equal({ bound: 'method', thisArg: sut })
      },
    },

    after: ({ originalBind }: any) => {
      KeyDownListener.prototype.onKeyDown$.bind = originalBind
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
        [`calls ${nameof(Controller.prototype.dispatchMove$)}`]: ({
          MockController,
        }) => {
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
        [`does NOT call ${nameof(Controller.prototype.dispatchMove$)}`]: ({
          MockController,
        }) => {
          verify(MockController.dispatchMove$(anything())).never()
        },
      },
    },
  },

})
