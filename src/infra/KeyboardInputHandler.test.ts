import { anything, instance, mock, verify } from 'ts-mockito'
import { LEFT } from '../domain/Direction'
import { a3 } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Controller from './Controller'
import KeyboardInputHandler from './KeyboardInputHandler'
import KeyMapper from './KeyMapper'

const arrange = () => {
  const MockDocument = mock(Document)
  const MockController = mock<Controller>()

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

  [nameof(KeyboardInputHandler.prototype.enable)]: {
    arrange,

    act: arranged => {
      arranged.sut.enable()
      return arranged
    },

    assert: {
      'adds keydown listener to document': ({
        MockDocument,
        sut,
      }) => {
        verify(MockDocument.addEventListener('keydown', sut.onKeyDown)).once()
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
      'removes keydown listener from document': ({
        MockDocument,
        sut,
      }) => {
        verify(MockDocument.removeEventListener('keydown', sut.onKeyDown))
          .once()
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
        'calls dispatchMove': ({ MockController }) => {
          verify(MockController.dispatchMove(LEFT)).once()
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
        'does NOT call dispatchMove': ({ MockController }) => {
          verify(MockController.dispatchMove(anything())).never()
        },
      },
    },
  },

})
