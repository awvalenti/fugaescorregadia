import * as React from 'react'
import { PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, Mooca, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import * as usePrevious from './hooks/usePrevious'
import PlayerTile from './PlayerTile'
import * as Tile from './Tile'

a3(PlayerTile, {
  arrange: () => {
    const mooca = new Mooca()
    mooca.stub(Tile, ({ tileId, style }) => <p style={style}>{tileId}</p>)
    mooca.stub(usePrevious, () => ({ row: 2, col: 4 }))

    return {
      mooca,
      component: render(<PlayerTile
        currentPos={({ row: 1, col: 2 })}
      />),
    }
  },

  act: ({ component: { container: ret } }) => ret,

  assert: {
    [`renders a ${PLAYER} <${nameof(Tile)}>`]: ({ firstElementChild }) => {
      expect(firstElementChild).to.have.property('textContent', 'PLAYER')
    },

    'sets translation to (100% * col, 100% * row)': ({ firstElementChild }) => {
      expect(firstElementChild).to.have.nested.property(
        'style.transform', 'translate(200%, 100%)')
    },

    'sets animation duration to 40ms * (deltaRow + deltaCol)':
    ({ firstElementChild }) => {
      expect(firstElementChild).to.have.nested.property(
        'style.transitionDuration', '120ms')
    },
  },

  after: ({ mooca }: { mooca: Mooca }) => {
    mooca.restore()
    cleanup()
  },

})
