import ReactModule from 'react/jsx-dev-runtime'
import sinon from 'sinon'
import { OBSTACLE, PLAYER } from '../domain/Tile'
import { a4, cleanup, expect, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import TileView from './TileView'

const after = ({ spy }: any) => {
  if (spy) spy.restore()
  cleanup()
}

a4(TileView, {
  'only with required props': {
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

  'with props style and onTransitionEnd': {
    arrange: () => {
      const spy = sinon.spy(ReactModule, 'jsxDEV')
      const onTransitionEnd = () => { }
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
      'sets style': ({ innerHTML }) => {
        expect(innerHTML).to.equal(
          '<div class="TileView PLAYER" style="color: blue;"></div>'
        )
      },

      'sets onTransitionEnd': ({ spy, onTransitionEnd }) => {
        expect(spy).to.have.been.calledWithMatch('div', { onTransitionEnd })
      },
    },

    after,
  },

})
