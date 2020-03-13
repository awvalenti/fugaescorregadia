import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import LevelModel from '../domain/level/LevelModel'
import TileId, { EMPTY, OBSTACLE } from '../domain/TileId'
import Mooca from '../my-libs/mooca'
import * as BackgroundLayer from './BackgroundLayer'
import Board from './Board'
import * as SpriteLayer from './SpriteLayer'

describe(Board.name, () => {

  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Board level={{
        playerPos: { row: 0, col: 0 },
        background: [] as TileId[][],
      } as LevelModel} />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  const mooca = new Mooca()

  before(() => {
    mooca.stub(BackgroundLayer, ({ matrix }) =>
      <p>[{matrix.map(rowData => `[${rowData.join(',')}]`).join(',')}]</p>)

    mooca.stub(SpriteLayer, ({ playerPos: { row, col } }) =>
      <p>PLAYER@({row},{col})</p>)
  })

  after(() => {
    mooca.restore()
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<Board level={{
      playerPos: { row: 1, col: 0 },
      background: [
        [EMPTY, OBSTACLE],
        [EMPTY, EMPTY],
      ],
    } as LevelModel} />))
  })

  it(`renders ${BackgroundLayer.default.name} and ${SpriteLayer.default.name}
    using ${LevelModel.name}`, () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div>
        <p>[[EMPTY,OBSTACLE],[EMPTY,EMPTY]]</p>
        <p>PLAYER@(1,0)</p>
      </div>
    ))
  })

})
