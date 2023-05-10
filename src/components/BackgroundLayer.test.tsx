import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { renderToStaticMarkup } from 'react-dom/server'
import { EMPTY, OBSTACLE } from '../domain/Tile'
import { a4 } from '../my-libs/a4'
import Mooca from '../my-libs/mooca'
import nameof from '../my-libs/nameof'
import BackgroundLayer from './BackgroundLayer'
import * as TileView from './TileView'

a4(BackgroundLayer, {
  arrange: () => {
    const mooca = new Mooca()
    mooca.stub(TileView, ({ tileId }) => <p>{tileId}</p>)

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
    [`renders rows and columns of <${nameof(TileView)}>s`]: innerHTML => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <div className="BackgroundLayer">
          <div className="row">
            <p>OBSTACLE</p>
            <p>EMPTY</p>
            <p>EMPTY</p>
          </div>
          <div className="row">
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
