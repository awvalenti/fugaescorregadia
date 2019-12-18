import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import Board from './Board'
import TileType from '../domain/TileType'
import Tile from './Tile'

const { EMPTY, OBSTACLE } = TileType

describe(Board.name, () => {
  after(cleanup)

  const originalTile = Tile

  before(() => {
    // @ts-ignore
    Tile = ({ type }) => <p>{type}</p>
  })

  after(() => {
    // @ts-ignore
    Tile = originalTile
  })

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

  it(`renders rows and columns of <${Tile.name}>s`, () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div>
        <div>
          <p>OBSTACLE</p>
          <p>EMPTY</p>
          <p>EMPTY</p>
        </div>
        <div>
          <p>EMPTY</p>
          <p>EMPTY</p>
          <p>EMPTY</p>
        </div>
      </div>
    ))
  })
})
