import ReactModule, * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { anything, instance, mock, verify } from 'ts-mockito'
import GameState from '../../domain/GameState'
import Level from '../../domain/level/Level'
import Position from '../../domain/Position'
import { MoveFinishedListener } from '../../infra/Controller'
import Mooca from '../../my-libs/mooca'
import { a3, cleanup, expect, render } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import * as Board from '../Board'
import UseController from '../hooks/UseController'
import App from './App'
import AppContext from './AppContext'

a3(App, {
  arrange: () => {
    const gameState = {
      level: 'level-a' as unknown as Level,
      playerPos: 'pos-b' as unknown as Position,
    } as GameState

    const setGameState = (_: GameState) => {}

    const mooca = new Mooca()

    mooca.stub(ReactModule, 'useState', ((initial: GameState) =>
      initial === gameState && [gameState, setGameState]) as any)

    mooca.stub(AppContext, 'Provider', (({ children, value }) =>
      <div id="AppContext">
        {value.moveFinishedListener.toString()}
        {children}
      </div>
    ) as typeof AppContext.Provider)

    mooca.stub(Board, ({ level, playerPos }) => <>{level},{playerPos}</>)

    const UseControllerMock = mock(UseController)

    return {
      gameState,
      useController: instance(UseControllerMock),
      UseControllerMock,
      mooca,
      setGameState,
    }
  },

  act: ({ gameState, useController, ...rest }: any) => ({
    sut: render(<App
      gameState={gameState}
      useController={useController}
      moveFinishedListener={{ toString: () => 'myMoveFinishedListener' } as
        MoveFinishedListener}
    />),
    useController,
    ...rest,
  }),

  assert: {
    [`runs ${nameof(UseController)} passing on setGameState`]:
    ({ UseControllerMock, setGameState }) => {
      verify(UseControllerMock.run$(anything())).once()
      verify(UseControllerMock.run$(setGameState)).called()
    },

    [`renders <main> with <${nameof(Board)}> using gameState`]:
    ({ sut: { container: { innerHTML } } }) => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <div id="AppContext">
          myMoveFinishedListener
          <main className="App">level-a,pos-b</main>
        </div>
      ))
    },

  },

  after: ({ mooca }: { mooca: Mooca }) => {
    mooca.restore()
    cleanup()
  },

})
