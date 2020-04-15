import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { OBSTACLE } from '../domain/TileId'
import { a3 } from '../my-libs/a3'
import Tile from './Tile'

a3(Tile, {
  arrange: () => render(<Tile tileId={OBSTACLE} />),

  act: component => component.container.innerHTML,

  assert: {
    'renders a <div> with classes TILE and {tileId}': innerHTML => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <div className="TILE OBSTACLE" />
      ))
    },
  },

  after: () => {
    cleanup()
  },

})
