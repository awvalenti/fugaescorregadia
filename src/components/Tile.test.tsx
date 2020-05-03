import * as React from 'react'
import { OBSTACLE, PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Tile from './Tile'

a3(Tile, {
  'without style': {
    arrange: () => render(<Tile tileId={OBSTACLE} />),

    act: ({ container: { innerHTML } }) => innerHTML,

    assert: {
      [`renders a <div> with classes ${nameof(Tile)}, {tileId}`]: innerHTML => {
        expect(innerHTML).to.equal(
          '<div class="Tile OBSTACLE"></div>'
        )
      },
    },

    after: () => {
      cleanup()
    },

  },

  'with style': {
    arrange: () => render(<Tile tileId={PLAYER} style={{ color: 'blue' }} />),

    act: ({ container: { innerHTML } }) => innerHTML,

    assert: {
      'includes the specified style': innerHTML => {
        expect(innerHTML).to.equal(
          '<div class="Tile PLAYER" style="color: blue;"></div>'
        )
      },
    },

    after: () => {
      cleanup()
    },

  },

})
