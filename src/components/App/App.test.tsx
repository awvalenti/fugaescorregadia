import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { anyFunction, anything, instance, mock, resetCalls, verify, when } from 'ts-mockito'
import GameState from '../../domain/GameState'
import Level from '../../domain/level/Level'
import Position from '../../domain/Position'
import { UpdateGameStateFn$ } from '../../infra/Controller'
import Mooca from '../../my-libs/mooca'
import { a3, cleanup, expect, render } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import * as Board from '../Board'
import UseController from '../hooks/UseController'
import App from './App'

const arrange = () => {
  const mooca = new Mooca()
  mooca.stub(Board, ({ level, playerPos }) => <>{level},{playerPos}</>)

  const ref: { updateGameState?: UpdateGameStateFn$ } = {}

  const UseControllerMock = mock(UseController)
  when(UseControllerMock.run$(anyFunction())).thenCall(fn => {
    ref.updateGameState = fn
  })

  return {
    gameState: {
      level: 'level-1' as unknown as Level,
      playerPos: 'pos-1' as unknown as Position,
    } as GameState,
    useController: instance(UseControllerMock),
    UseControllerMock,
    mooca,
    ref,
  }
}

const mount = ({ gameState, useController, ...rest }: any) => ({
  sut: render(<App
    gameState={gameState}
    useController={useController}
  />),
  useController,
  ...rest,
})

const after = ({ mooca }: { mooca: Mooca }) => {
  mooca.restore()
  cleanup()
}

a3(App, {
  'on first render': {
    arrange,
    act: mount,
    assert: {
      [`renders <main> with <${nameof(Board)}> using initial state`]:
      ({ sut }) => {
        expect(sut.container.innerHTML).to.equal(renderToStaticMarkup(
          <main className="App">level-1,pos-1</main>
        ))
      },

      [`runs ${nameof(UseController)}`]: ({ UseControllerMock }) => {
        verify(UseControllerMock.run$(anything())).once()
        verify(UseControllerMock.run$(anyFunction())).called()
      },
    },
    after,
  },

  'on rerender': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { UseControllerMock, ref: { updateGameState } } = mounted

      resetCalls(UseControllerMock)

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

      [`runs ${nameof(UseController)}`]: ({ UseControllerMock }) => {
        verify(UseControllerMock.run$(anything())).once()
        verify(UseControllerMock.run$(anyFunction())).called()
      },
    },

    after,
  },

})
