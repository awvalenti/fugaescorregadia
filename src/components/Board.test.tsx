import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import Board from './Board'

describe(Board.name, () => {
  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Board matrix={[[]]} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(
      <Board matrix={[['a', 'b', 'c'], ['d', 'e', 'f']]} />))
  })

  it('creates rows and columns', () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div>
        <div>
          <div>a</div>
          <div>b</div>
          <div>c</div>
        </div>
        <div>
          <div>d</div>
          <div>e</div>
          <div>f</div>
        </div>
      </div>
    ))
  })
})
