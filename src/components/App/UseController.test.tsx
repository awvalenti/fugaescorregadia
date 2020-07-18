import { cleanup, renderHook } from '@testing-library/react-hooks'
import { anything, instance, mock, resetCalls, verify } from 'ts-mockito'
import Controller, { UpdateGameStateFn } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'
import { a3 } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import UseController from './UseController'

const arrange = () => {
  const
    MockController = mock(Controller),
    MockKeyboardHandler = mock(KeyboardHandler),
    controller = instance(MockController),
    keyboardHandler = instance(MockKeyboardHandler),
    setGameState = {} as UpdateGameStateFn

  return {
    MockController,
    MockKeyboardHandler,

    controller,
    keyboardHandler,
    setGameState,
  }
}

const mount = ({
  controller,
  keyboardHandler,
  setGameState,
  ...rest
}: any) => ({
  sut: renderHook(() => new UseController(
    controller, keyboardHandler).run(setGameState)),
  setGameState,
  ...rest,
})

const after = () => {
  cleanup()
}

a3(UseController, {
  'on first render': {
    arrange,
    act: mount,
    assert: {
      [`calls ${nameof(Controller.prototype.setUpdateGameStateFn)}`]:
      ({ MockController, setGameState }) => {
        verify(MockController.setUpdateGameStateFn(anything())).once()
        verify(MockController.setUpdateGameStateFn(setGameState)).called()
      },

      [`calls ${nameof(KeyboardHandler.prototype.enable)}`]:
      ({ MockKeyboardHandler }) => {
        verify(MockKeyboardHandler.enable()).once()
      },
    },
    after,
  },

  'on rerender': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { MockController, MockKeyboardHandler, sut } = mounted

      resetCalls(MockController)
      resetCalls(MockKeyboardHandler)

      sut.rerender()

      return mounted
    },

    assert: {
      [`does NOT call again ${nameof(Controller.prototype
        .setUpdateGameStateFn)}`]: ({ MockController }) => {
        verify(MockController.setUpdateGameStateFn(anything())).never()
      },

      [`does NOT call again ${nameof(KeyboardHandler.prototype
        .enable)}`]: ({ MockKeyboardHandler }) => {
        verify(MockKeyboardHandler.enable()).never()
      },
    },

    after,
  },

  'on umount': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { MockKeyboardHandler, sut } = mounted

      resetCalls(MockKeyboardHandler)

      sut.unmount()

      return MockKeyboardHandler
    },

    assert: {
      [`calls ${nameof(KeyboardHandler.prototype.disable)}`]:
      MockKeyboardHandler => {
        verify(MockKeyboardHandler.disable()).once()
      },
    },

    after,
  },

})
