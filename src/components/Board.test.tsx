import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import Board from './Board'
import TileType from '../domain/TileType'

const { EMPTY, OBSTACLE } = TileType

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
      <Board matrix={[
        [OBSTACLE, EMPTY, EMPTY],
        [EMPTY,    EMPTY, EMPTY],
      ]} />))
  })

  it('creates rows and columns', () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div>
        <div>
          <div>OBSTACLE</div>
          <div>EMPTY</div>
          <div>EMPTY</div>
        </div>
        <div>
          <div>EMPTY</div>
          <div>EMPTY</div>
          <div>EMPTY</div>
        </div>
      </div>
    ))
  })
})
