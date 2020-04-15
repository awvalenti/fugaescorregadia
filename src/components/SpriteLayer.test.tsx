import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import { a3 } from '../my-libs/a3'
import SpriteLayer from './SpriteLayer'

a3(SpriteLayer, {
  arrange: () => render(<SpriteLayer playerPos={{ row: 1, col: 2 }} />),

  act: component => component.container.firstElementChild,

  assert: {
    'sets style > transform > translate appropriately': spriteLayer => {
      expect(spriteLayer.querySelector('.PLAYER')).to.have.nested.property(
        'style.transform', 'translate(200%, 100%)')
    },
  },

  after: () => {
    cleanup()
  },

})
