import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { describe, it, before, after } from 'mocha'
import { expect } from 'chai'

import Board from './src/components/Board'

describe(App.name, () => {
  before(() => {
    const ret = <>mock {Board.name}</>
    Board = () => ret
  })

  let ctn: HTMLDivElement

  before(() => {
    ctn = document.createElement('div')
    ReactDOM.render(<App />, ctn)
  })

  it(`renders ${Board.name}`, () => {
    expect(ctn.textContent).to.equal('mock Board')
  })

  after(() => {
    ReactDOM.unmountComponentAtNode(ctn)
  })
})
