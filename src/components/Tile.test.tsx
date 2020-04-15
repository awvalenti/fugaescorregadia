import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { OBSTACLE } from '../domain/TileId'
import Tile from './Tile'

describe(Tile.name, () => {
  after(cleanup)

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
