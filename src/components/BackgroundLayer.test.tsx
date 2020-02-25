import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { EMPTY, OBSTACLE } from '../domain/TileId'
import Mooca from '../my-libs/mooca'
import BackgroundLayer from './BackgroundLayer'
import * as Tile from './Tile'

describe(BackgroundLayer.name, () => {
  after(cleanup)

  const mooca = new Mooca()

  before(() => {
    mooca.stub(Tile, ({ tileId }) => <p>{tileId}</p>)
  })

  after(() => {
    mooca.restore()
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

  it(`renders rows and columns of <${Tile.default.name}>s`, () => {
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
