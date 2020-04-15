import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { a3 } from '../my-libs/a3'
import Mooca from '../my-libs/mooca'
import App from './App'
import * as Board from './Board'

a3(App, {
  arrange: () => {
    const mooca = new Mooca()

    const { name } = Board.default
    mooca.stub(Board, () => <>{name}</>)

    return {
      mooca,
      component: render(<App />),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders <${Board.default.name}>`]: innerHTML => {
      expect(innerHTML).to.equal('Board')
    },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
