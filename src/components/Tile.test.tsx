import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import Tile from './Tile'
import TileId from '../domain/TileId'

const { EMPTY, OBSTACLE } = TileId

describe(Tile.name, () => {
  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tile tileId={EMPTY} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<Tile tileId={OBSTACLE} />))
  })

  it('creates a <div> with classes TILE and {type}', () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div className="TILE OBSTACLE" />
    ))
  })
})
