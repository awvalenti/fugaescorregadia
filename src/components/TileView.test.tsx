import ReactModule, * as React from 'react'
import sinon from 'sinon'
import { OBSTACLE, PLAYER } from '../domain/TileId'
import { a3, cleanup, expect, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import TileView from './TileView'

const after = ({ spy }: any) => {
  if (spy) spy.restore()
  cleanup()
}

a3(TileView, {
  'without optional props': {
    arrange: () => render(<TileView tileId={OBSTACLE} />),
    act: ({ container: { innerHTML } }) => innerHTML,
    assert: {
      [`renders a <div> with classes ${nameof(TileView)}, {tileId}`]: innerHTML => {
        expect(innerHTML).to.equal(
          '<div class="TileView OBSTACLE"></div>'
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
        sut: render(<TileView
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
          '<div class="TileView PLAYER" style="color: blue;"></div>'
        )
      },

      'passes on prop onTransitionEnd': ({ spy, onTransitionEnd }) => {
        expect(spy).to.have.been.calledWithMatch('div', { onTransitionEnd })
      },
    },

    after,
  },

})
