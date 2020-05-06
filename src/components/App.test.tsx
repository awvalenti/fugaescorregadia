import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Level from '../domain/level/Level'
import { a3 } from '../my-libs/a3'
import Mooca from '../my-libs/mooca'
import nameof from '../my-libs/nameof'
import App from './App'
import * as Board from './Board'

a3(App, {
  arrange: () => {
    const mooca = new Mooca()

    const name = nameof(Board)

    mooca.stub(Board, ({ level }) => <>{name}:{level.toString()}</>)

    return {
      mooca,
      component: render(<App level={{ toString: () => 'myLevel' } as Level}/>),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders <main> with <${nameof(Board)}> using level`]: innerHTML => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <main className="App">Board:myLevel</main>
      ))
    },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
