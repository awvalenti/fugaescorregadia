import * as React from 'react'
import { a3, cleanup, expect, Mooca, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import * as PlayerTile from './PlayerTile'
import SpriteLayer from './SpriteLayer'

a3(SpriteLayer, {
  arrange: () => {
    const mooca = new Mooca()

    mooca.stub(PlayerTile, ({ playerPos: { row, col } }) => <p>{row},{col}</p>)

    return {
      mooca,
      component: render(<SpriteLayer
        rowCount={100}
        colCount={40}
        playerPos={{ row: 10, col: 20 }}
      />),
    }
  },

  act: ({ component: { container: ret } }) => ret,

  assert: {
    'renders a <div>': ({ firstElementChild }) => {
      expect(firstElementChild).to.be.instanceof(HTMLDivElement)
    },

    'sets className': ({ firstElementChild }) => {
      expect(firstElementChild).to.have.property('className', 'SpriteLayer')
    },

    'sets dimensions using row/col count': ({ firstElementChild: { style } }) => {
      expect([style.width, style.height]).to.deep.equal(['2.5%', '1%'])
    },

    [`renders a <${nameof(PlayerTile)}>`]: ({ firstElementChild }) => {
      expect(firstElementChild.querySelector('p')).to.have.property(
        'textContent', '10,20')
    },

  },

  after: ({ mooca }) => {
    mooca.restore()
    cleanup()
  },

})
