import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sinon from 'sinon'
import GameState from '../../domain/GameState'
import Level from '../../domain/level/Level'
import Position from '../../domain/Position'
import { UpdateGameStateFn } from '../../infra/Controller'
import Mooca from '../../my-libs/mooca'
import { a3, cleanup, expect, render } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import * as Board from '../Board'
import App, { UseController } from './App'

const arrange = () => {
  const mooca = new Mooca()
  mooca.stub(Board, ({ level, playerPos }) => <>{level},{playerPos}</>)

  const
    gameState = {
      level: 'level-1' as unknown as Level,
      playerPos: 'pos-1' as unknown as Position,
    } as GameState,

    ref: { updateGameState?: UpdateGameStateFn } = {},

    useController = sinon.spy<UseController>(fn => {
      ref.updateGameState = fn
    })

  return { gameState, useController, mooca, ref }
}

const mount = ({ gameState, useController, mooca, ref }: any) => ({
  sut: render(<App gameState={gameState} useController={useController} />),
  useController,
  mooca,
  ref,
})

const after = ({ mooca }: { mooca: Mooca }) => {
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

      'calls useController': ({ useController }) => {
        expect(useController).calledOnceWithExactly(sinon.match.func)
      },
    },
    after,
  },

  'on rerender': {
    arrange,

    act: arranged => {
      const
        mounted = mount(arranged),
        { useController, ref: { updateGameState } } = mounted

      useController.resetHistory()

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

      'calls useController': ({ useController }) => {
        expect(useController).calledOnceWithExactly(sinon.match.func)
      },
    },

    after,
  },

})
