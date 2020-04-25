import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Level from '../domain/level/Level'
import { EMPTY, OBSTACLE } from '../domain/TileId'
import { a3 } from '../my-libs/a3'
import Mooca from '../my-libs/mooca'
import nameof from '../my-libs/nameof'
import * as BackgroundLayer from './BackgroundLayer'
import Board from './Board'
import * as SpriteLayer from './SpriteLayer'

a3(Board, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(BackgroundLayer, ({ matrix }) =>
      <p>[{matrix.map(rowData => `[${rowData.join(',')}]`).join(',')}]</p>)

    mooca.stub(SpriteLayer, ({ playerPos: { row, col } }) =>
      <p>PLAYER@({row},{col})</p>)

    return {
      mooca,
      component: render(<Board level={{
        playerPos: { row: 1, col: 0 },
        background: [
          [EMPTY, OBSTACLE],
          [EMPTY, EMPTY],
        ],
      } as Level} />),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders <${nameof(BackgroundLayer)}> and <${nameof(SpriteLayer)}>
    using ${nameof(Level)}`]: innerHTML => {
      expect(innerHTML).to.equal(renderToStaticMarkup(
        <div>
          <p>[[EMPTY,OBSTACLE],[EMPTY,EMPTY]]</p>
          <p>PLAYER@(1,0)</p>
        </div>
      ))
    },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
