import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { anyFunction, anything, instance, mock, verify } from 'ts-mockito'
import GameState from '../domain/GameState'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import Controller from '../infra/Controller'
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
      level: 'my-level' as unknown as Level,
      playerPos: 'my-pos' as unknown as Position,
    } as GameState,
    controller = instance(MockController),
    keyboardInputHandler = instance(MockKeyboardInputHandler)

  return {
    mooca,

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
  component: render(<App
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
      [`renders <main> with <${nameof(Board)}> using level and playerPos`]: ({
        component,
      }) => {
        expect(component.container.innerHTML).to.equal(renderToStaticMarkup(
          <main className="App">my-level,my-pos</main>
        ))
      },

      [`calls ${nameof(Controller.prototype.setUpdateGameStateFn)}`]: ({
        MockController,
      }) => {
        verify(MockController.setUpdateGameStateFn(anything())).once()
        verify(MockController.setUpdateGameStateFn(anyFunction())).called()
      },

      [`calls ${nameof(KeyboardInputHandler.prototype.enable)}`]: ({
        MockKeyboardInputHandler,
      }) => {
        verify(MockKeyboardInputHandler.enable()).once()
      },
    },

    after,
  },

  'on umount': {
    arrange,

    act: arranged => {
      const acted = mount(arranged)
      acted.component.unmount()
      return acted
    },

    assert: {
      [`calls ${nameof(KeyboardInputHandler.prototype.disable)}`]: ({
        MockKeyboardInputHandler,
      }) => {
        verify(MockKeyboardInputHandler.disable()).once()
      },
    },

    after,
  },

})
