import * as React from 'react'
import { PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, Mooca, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import PlayerTile from './PlayerTile'
import * as Tile from './Tile'

a3(PlayerTile, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(Tile, ({ tileId, style }) => <p style={style}>{tileId}</p>)

    return {
      mooca,
      component: render(<PlayerTile playerPos={{ row: 1, col: 2 }} />),
    }
  },

  act: ({ component: { container: ret } }) => ret,

  assert: {
    [`renders a ${PLAYER} <${nameof(Tile)}>`]: ({ firstElementChild }) => {
      expect(firstElementChild).to.have.property('textContent', 'PLAYER')
    },

    'sets translation correctly': ({ firstElementChild }) => {
      expect(firstElementChild).to.have.nested.property(
        'style.transform', 'translate(200%, 100%)')
    },

  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
