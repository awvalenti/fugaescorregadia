import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { renderToStaticMarkup } from 'react-dom/server'
import Position from '../domain/Position'
import { EMPTY, GOAL, OBSTACLE, PLAYER, TileMatrix } from '../domain/Tile'
import Level from '../domain/level/Level'
import { a4 } from '../my-libs/a4'
import Mooca from '../my-libs/mooca'
import nameof from '../my-libs/nameof'
import pureComponent from '../my-libs/pure-component'
import * as BackgroundLayer from './BackgroundLayer'
import Board from './Board'
import * as SpriteLayer from './SpriteLayer'

a4(Board, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(BackgroundLayer, pureComponent(({ matrix }) =>
      <p>[{matrix.map(rowData => `[${rowData.join(',')}]`).join(',')}]</p>))

    mooca.stub(SpriteLayer, ({ rowCount, colCount, playerPos: { row, col } }) =>
      <p>Dimensions:{rowCount}x{colCount} playerPos:{row},{col}</p>)

    return {
      mooca,
      component: render(<Board
        playerPos={new Position(1, 0)}
        level={{
          rowCount: 2,
          colCount: 3,
          background: [
            [EMPTY, EMPTY, OBSTACLE],
            [PLAYER, EMPTY, GOAL],
          ] as TileMatrix,
        } as Level} />),
    }
  },

  act: ({ component }) => component.container.innerHTML,

  assert: {
    [`renders <${nameof(BackgroundLayer)}> and <${nameof(SpriteLayer)}>
    using ${nameof(Level)}`]: innerHTML => {
        expect(innerHTML).to.equal(renderToStaticMarkup(
          <div className="Board">
            <p>[[EMPTY,EMPTY,OBSTACLE],[PLAYER,EMPTY,GOAL]]</p>
            <p>Dimensions:2x3 playerPos:1,0</p>
          </div>
        ))
      },
  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
