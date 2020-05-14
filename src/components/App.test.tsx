import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import GameState from '../domain/GameState'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import { a3 } from '../my-libs/a3'
import Mooca from '../my-libs/mooca'
import nameof from '../my-libs/nameof'
import App from './App'
import * as Board from './Board'

a3(App, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(Board, ({ level, playerPos }) => <>{level},{playerPos}</>)

    return {
      mooca,
      component: render(<App gameState={{
        level: 'my-level' as unknown as Level,
        playerPos: 'my-pos' as unknown as Position,
      } as GameState} />),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders <main> with <${nameof(Board)}> using level and playerPos`]: innerHTML => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <main className="App">my-level,my-pos</main>
      ))
    },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
