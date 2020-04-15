import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import * as React from 'react'
import Mooca from '../my-libs/mooca'
import App from './App'
import * as Board from './Board'

describe(App.name, () => {
  after(cleanup)

  const mooca = new Mooca()

  before(() => {
    const { name } = Board.default
    mooca.stub(Board, () => <>{name}</>)
  })

  after(() => {
    mooca.restore()
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<App />))
  })

  it(`renders <${Board.default.name}>`, () => {
    expect(innerHTML).to.equal('Board')
  })
})
