import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Board from './Board'

describe(App.name, () => {
  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  const real = Board

  before(() => {
    const { name } = Board
    const stub: typeof Board = () => <>{name}</>
    // @ts-ignore
    Board = stub
  })

  after(() => {
    // @ts-ignore
    Board = real
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<App />))
  })

  it(`renders <${Board.name}>`, () => {
    expect(innerHTML).to.equal('Board')
  })
})
