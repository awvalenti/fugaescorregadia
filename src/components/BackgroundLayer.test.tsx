import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import BackgroundLayer from './BackgroundLayer'
import { EMPTY, OBSTACLE } from '../domain/TileId'
import Tile from './Tile'

describe(BackgroundLayer.name, () => {
  after(cleanup)

  const real = Tile

  before(() => {
    const stub: typeof Tile = ({ tileId }) => <p>{tileId}</p>

    // @ts-ignore
    Tile = stub
  })

  after(() => {
    // @ts-ignore
    Tile = real
  })

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BackgroundLayer matrix={[[]]} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(
      <BackgroundLayer matrix={[
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
