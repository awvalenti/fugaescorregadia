import { cleanup, renderHook } from '@testing-library/react'
import { anything, instance, mock, resetCalls, verify } from 'ts-mockito'
import Controller, { StorageForUpdateGameStateFn, UpdateGameState$ } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'
import { a4 } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import UseController from './UseController'

const arrange = () => {
  const
    StorageForUpdateGameStateFn = mock<StorageForUpdateGameStateFn>(Controller),
    MockKeyboardHandler = mock(KeyboardHandler),
    controller = instance(StorageForUpdateGameStateFn),
    keyboardHandler = instance(MockKeyboardHandler),
    setGameState = {} as UpdateGameState$

  return {
    StorageForUpdateGameStateFn,
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
    controller, keyboardHandler).run$(setGameState)),
  setGameState,
  ...rest,
})

const after = () => {
  cleanup()
}

a4(UseController, {
  'on first render': {
    arrange,
    act: mount,
    assert: {
      [`calls ${nameof<StorageForUpdateGameStateFn>('setUpdateGameStateFn$')}`]:
        ({ StorageForUpdateGameStateFn, setGameState }) => {
          verify(StorageForUpdateGameStateFn.setUpdateGameStateFn$(anything())).once()
          verify(StorageForUpdateGameStateFn.setUpdateGameStateFn$(setGameState)).called()
        },

      [`calls ${nameof<KeyboardHandler>('enable$')}`]:
        ({ MockKeyboardHandler }) => {
          verify(MockKeyboardHandler.enable$()).once()
        },
    },
    after,
  },

  'on rerender': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { StorageForUpdateGameStateFn, MockKeyboardHandler, sut } = mounted

      resetCalls(StorageForUpdateGameStateFn)
      resetCalls(MockKeyboardHandler)

      sut.rerender()

      return mounted
    },

    assert: {
      [`does NOT call again ${nameof<StorageForUpdateGameStateFn>('setUpdateGameStateFn$')}`]:
        ({ StorageForUpdateGameStateFn }) => {
          verify(StorageForUpdateGameStateFn.setUpdateGameStateFn$(anything())).never()
        },

      [`does NOT call again ${nameof<KeyboardHandler>('enable$')}`]:
        ({ MockKeyboardHandler }) => {
          verify(MockKeyboardHandler.enable$()).never()
        },
    },

    after,
  },

  'on unmount': {
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
      [`calls ${nameof<KeyboardHandler>('disable$')}`]:
        MockKeyboardHandler => {
          verify(MockKeyboardHandler.disable$()).once()
        },
    },

    after,
  },

})
