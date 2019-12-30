import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'
import BackgroundLayer from './BackgroundLayer'
import SpriteLayer from './SpriteLayer'
import { renderToStaticMarkup } from 'react-dom/server'
import LevelModel from '../domain/LevelModel'
import TileId, { EMPTY, OBSTACLE } from '../domain/TileId'

describe(Board.name, () => {

  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Board level={{
        playerPos: { row: 0, col: 0 },
        background: [] as TileId[][]
      } as LevelModel} />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  const realBl = BackgroundLayer
  const realSl = SpriteLayer

  before(() => {
    const blName = BackgroundLayer.name
    const blStub: typeof BackgroundLayer = ({ matrix }) =>
      <p>
        {blName}: [
          {matrix.map(rowData =>
            `[${rowData.join(',')}]`
          ).join(',')}
        ]
      </p>
    // @ts-ignore
    BackgroundLayer = blStub

    const slName = SpriteLayer.name
    const slStub: typeof SpriteLayer = ({ playerPos: { row, col } }) =>
      <p>{slName}: PLAYER@({row},{col})</p>
    // @ts-ignore
    SpriteLayer = slStub
  })

  after(() => {
    // @ts-ignore
    BackgroundLayer = realBl
    // @ts-ignore
    SpriteLayer = realSl
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<Board level={{
      playerPos: { row: 1, col: 0 },
      background: [
        [EMPTY, OBSTACLE],
        [EMPTY, EMPTY],
      ]
    } as LevelModel} />))
  })

  it(`decomposes levelModel to render ${BackgroundLayer.name}
    and ${SpriteLayer.name}`, () => {
    expect(innerHTML).to.equal(renderToStaticMarkup(
      <div>
        <p>BackgroundLayer: [[EMPTY,OBSTACLE],[EMPTY,EMPTY]]</p>
        <p>SpriteLayer: PLAYER@(1,0)</p>
      </div>
    ))
  })

})
