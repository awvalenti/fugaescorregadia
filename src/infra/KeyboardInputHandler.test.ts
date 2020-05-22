import { anything, instance, mock, verify } from 'ts-mockito'
import { LEFT } from '../domain/Direction'
import { a3, expect } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller from './Controller'
import KeyboardInputHandler from './KeyboardInputHandler'
import KeyMapper from './KeyMapper'

const arrange = () => {
  const
    MockDocument = mock(Document),
    MockController = mock(Controller)

  return {
    MockDocument,
    MockController,
    sut: new KeyboardInputHandler(
      instance(MockDocument),
      new KeyMapper(),
      instance(MockController),
    ),
  }
}

a3(KeyboardInputHandler, {

  constructor: {
    arrange: () => {
      const originalBind = KeyboardInputHandler.prototype.onKeyDown.bind

      KeyboardInputHandler.prototype.onKeyDown.bind = function(thisArg: {}) {
        return { bound: 'method', thisArg } as any
      }

      return { originalBind }
    },

    act: ({ originalBind }: any) => ({
      sut: new KeyboardInputHandler(
          {} as Document,
          {} as KeyMapper,
          {} as Controller,
      ),
      originalBind,
    }),

    assert: {
      [`binds ${nameof(KeyboardInputHandler.prototype.onKeyDown)}
      to this`]: ({ sut }: any) => {
        expect(sut.onKeyDown).to.deep.equal({ bound: 'method', thisArg: sut })
      },
    },

    after: ({ originalBind }: any) => {
      KeyboardInputHandler.prototype.onKeyDown.bind = originalBind
    },

  },

  [nameof(KeyboardInputHandler.prototype.enable)]: {
    arrange,

    act: arranged => {
      arranged.sut.enable()
      return arranged
    },

    assert: {
      'adds keydown listener to document': ({ MockDocument, sut }) => {
        verify(MockDocument.addEventListener(anything(), anything())).once()
        verify(MockDocument.addEventListener('keydown', sut.onKeyDown)).called()
      },
    },
  },

  [nameof(KeyboardInputHandler.prototype.disable)]: {
    arrange,

    act: arranged => {
      arranged.sut.disable()
      return arranged
    },

    assert: {
      'removes keydown listener from document': ({ MockDocument, sut }) => {
        verify(MockDocument.removeEventListener(anything(), anything()))
          .once()
        verify(MockDocument.removeEventListener('keydown', sut.onKeyDown))
          .called()
      },
    },
  },

  [nameof(KeyboardInputHandler.prototype.onKeyDown)]: {
    'when key is mapped': {
      arrange,

      act: arranged => {
        arranged.sut.onKeyDown({ code: 'ArrowLeft' } as KeyboardEvent)
        return arranged
      },

      assert: {
        [`calls ${nameof(Controller.prototype.dispatchMove)}`]: ({
          MockController,
        }) => {
          verify(MockController.dispatchMove(anything())).once()
          verify(MockController.dispatchMove(LEFT)).called()
        },
      },
    },

    'when key is NOT mapped': {
      arrange,

      act: arranged => {
        arranged.sut.onKeyDown({ code: 'ScrollLock' } as KeyboardEvent)
        return arranged
      },

      assert: {
        [`does NOT call ${nameof(Controller.prototype.dispatchMove)}`]: ({
          MockController,
        }) => {
          verify(MockController.dispatchMove(anything())).never()
        },
      },
    },
  },

})
