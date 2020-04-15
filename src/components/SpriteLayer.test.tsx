import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import SpriteLayer from './SpriteLayer'

describe(SpriteLayer.name, () => {
  after(cleanup)

  let spriteLayer: Element

  before(() => {
    spriteLayer = render(<SpriteLayer playerPos={{ row: 1, col: 2 }} />)
      .container.firstElementChild!
  })

  it('sets style > transform > translate appropriately', () => {
    expect(spriteLayer.querySelector('.PLAYER')).to.have.nested.property(
      'style.transform', 'translate(200%, 100%)')
  })
})
