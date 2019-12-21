import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import Board from './Board'
import TileId from '../domain/TileId'
import Tile, { Type as TileType } from './Tile'

const { EMPTY, OBSTACLE } = TileId

describe(Board.name, () => {
  after(cleanup)

  const real = Tile

  before(() => {
    const mock: TileType = ({ tileId }) => <p>{tileId}</p>
    // @ts-ignore
    Tile = mock
  })

  after(() => {
    // @ts-ignore
    Tile = real
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
