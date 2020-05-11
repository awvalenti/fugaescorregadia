import * as React from 'react'
import { PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, Mooca, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import SpriteLayer from './SpriteLayer'
import * as Tile from './Tile'

a3(SpriteLayer, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(Tile, ({ tileId, style }) => <p style={style}>{tileId}</p>)

    return {
      mooca,
      component: render(<SpriteLayer
        rowCount={100}
        colCount={40}
        playerPos={{ row: 1, col: 2 }}
      />),
    }
  },

  act: ({ component: { container: ret } }) => ret,

  assert: {
    'renders a single root element': ({ children }) => {
      expect(children).to.have.length(1)
    },

    'renders a <div>': ({ firstElementChild }) => {
      expect(firstElementChild).to.be.instanceof(HTMLDivElement)
    },

    [`renders a <${nameof(Tile)}> for ${PLAYER}`]: ({ firstElementChild }) => {
      expect(firstElementChild.querySelector('p')).to.have.property(
        'textContent', 'PLAYER')
    },

    'sets dimensions correctly': ({ firstElementChild }) => {
      expect(firstElementChild).to.have.property('style')
        .includes({ width: '2.5%', height: '1%' })
    },

    [`sets ${PLAYER} translation correctly`]: ({ firstElementChild }) => {
      expect(firstElementChild.querySelector('p')).to.have.nested.property(
        'style.transform', 'translate(200%, 100%)')
    },

  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
