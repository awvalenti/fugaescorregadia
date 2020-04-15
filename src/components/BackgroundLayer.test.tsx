import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { EMPTY, OBSTACLE } from '../domain/TileId'
import { a3 } from '../my-libs/a3'
import Mooca from '../my-libs/mooca'
import BackgroundLayer from './BackgroundLayer'
import * as Tile from './Tile'

a3(BackgroundLayer, {
  arrange: () => {
    const mooca = new Mooca()
    mooca.stub(Tile, ({ tileId }) => <p>{tileId}</p>)

    return {
      mooca,
      component: render(
        <BackgroundLayer matrix={[
          [OBSTACLE, EMPTY, EMPTY],
          [EMPTY, EMPTY, EMPTY],
        ]} />),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders rows and columns of <${Tile.default.name}>s`]: innerHTML => {
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
    },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
