import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { anyFunction, anything, instance, mock, resetCalls, verify, when } from 'ts-mockito'
import GameState from '../domain/GameState'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import Controller, { UpdateGameStateFn } from '../infra/Controller'
import KeyboardInputHandler from '../infra/KeyboardInputHandler'
import Mooca from '../my-libs/mooca'
import { a3, cleanup, expect, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import App from './App'
import * as Board from './Board'

const arrange = () => {
  const mooca = new Mooca()

  mooca.stub(Board, ({ level, playerPos }) => <>{level},{playerPos}</>)

  const
    MockController = mock(Controller),
    MockKeyboardInputHandler = mock(KeyboardInputHandler),

    gameState = {
      level: 'level-1' as unknown as Level,
      playerPos: 'pos-1' as unknown as Position,
    } as GameState,
    controller = instance(MockController),
    keyboardInputHandler = instance(MockKeyboardInputHandler),

    ref: { updateGameState?: UpdateGameStateFn } = {}

  when(MockController.setUpdateGameStateFn(anyFunction())).thenCall(fn => {
    ref.updateGameState = fn
  })

  return {
    mooca,
    ref,

    MockController,
    MockKeyboardInputHandler,

    gameState,
    controller,
    keyboardInputHandler,
  }
}

const mount = ({
  gameState,
  controller,
  keyboardInputHandler,
  ...rest
}: any) => ({
  sut: render(<App
    gameState={gameState}
    controller={controller}
    keyboardInputHandler={keyboardInputHandler}
  />),
  ...rest,
})

const after = ({ mooca }: any) => {
  mooca.restore()
  cleanup()
}

a3(App, {
  'on mount': {
    arrange,

    act: mount,

    assert: {

      [`renders <main> with <${nameof(Board)}> using initial state`]:
      ({ sut }) => {
        expect(sut.container.innerHTML).to.equal(renderToStaticMarkup(
          <main className="App">level-1,pos-1</main>
        ))
      },

      [`calls ${nameof(Controller.prototype.setUpdateGameStateFn)}`]:
      ({ MockController }) => {
        verify(MockController.setUpdateGameStateFn(anything())).once()
        verify(MockController.setUpdateGameStateFn(anyFunction())).called()
      },

      [`calls ${nameof(KeyboardInputHandler.prototype.enable)}`]:
      ({ MockKeyboardInputHandler }) => {
        verify(MockKeyboardInputHandler.enable()).once()
      },

    },

    after,
  },

  'on rerender': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        {
          MockController,
          MockKeyboardInputHandler,
          ref: { updateGameState },
        } = mounted

      resetCalls(MockController)
      resetCalls(MockKeyboardInputHandler)

      updateGameState({ level: 'level-2', playerPos: 'pos-2' })

      return mounted
    },

    assert: {
      [`renders <main> with <${nameof(Board)}> using updated state`]:
      ({ sut }) => {
        expect(sut.container.innerHTML).to.equal(renderToStaticMarkup(
          <main className="App">level-2,pos-2</main>
        ))
      },

      [`does NOT call again ${nameof(Controller.prototype
        .setUpdateGameStateFn)}`]: ({ MockController }) => {
        verify(MockController.setUpdateGameStateFn(anything())).never()
      },

      [`does NOT call again ${nameof(KeyboardInputHandler.prototype
        .enable)}`]: ({ MockKeyboardInputHandler }) => {
        verify(MockKeyboardInputHandler.enable()).never()
      },

    },

    after,
  },

  'on umount': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { MockKeyboardInputHandler, sut } = mounted

      resetCalls(MockKeyboardInputHandler)

      sut.unmount()

      return MockKeyboardInputHandler
    },

    assert: {
      [`calls ${nameof(KeyboardInputHandler.prototype.disable)}`]:
      MockKeyboardInputHandler => {
        verify(MockKeyboardInputHandler.disable()).once()
      },
    },

    after,
  },

})
