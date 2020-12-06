import ReactModule, * as React from 'react'
import sinon from 'sinon'
import { OBSTACLE, PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import Tile from './Tile'

const after = ({ spy }: any) => {
  if (spy) spy.restore()
  cleanup()
}

a3(Tile, {
  'without optional props': {
    arrange: () => render(<Tile tileId={OBSTACLE} />),
    act: ({ container: { innerHTML } }) => innerHTML,
    assert: {
      [`renders a <div> with classes ${nameof(Tile)}, {tileId}`]: innerHTML => {
        expect(innerHTML).to.equal(
          '<div class="Tile OBSTACLE"></div>'
        )
      },
    },
    after,
  },

  'with optional props': {
    arrange: () => {
      const spy = sinon.spy(ReactModule, 'createElement')
      const onTransitionEnd = () => {}
      return {
        spy,
        onTransitionEnd,
        sut: render(<Tile
          tileId={PLAYER}
          style={{ color: 'blue' }}
          onTransitionEnd={onTransitionEnd}
        />),
      }
    },

    act: ({ spy, onTransitionEnd, sut: { container: { innerHTML } } }) =>
      ({ spy, onTransitionEnd, innerHTML }),

    assert: {
      'includes the specified style': ({ innerHTML }) => {
        expect(innerHTML).to.equal(
          '<div class="Tile PLAYER" style="color: blue;"></div>'
        )
      },

      'passes on prop onTransitionEnd': ({ spy, onTransitionEnd }) => {
        expect(spy).to.have.been.calledWithExactly('div', {
          onTransitionEnd,
          className: 'Tile PLAYER',
          style: { color: 'blue' },
        })
      },
    },

    after,
  },

})
