import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import SpriteLayer from './SpriteLayer'

describe(SpriteLayer.name, () => {
  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SpriteLayer playerPos={{ row: 0, col: 0 }} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  let spriteLayer: Element

  before(() => {
    spriteLayer = render(<SpriteLayer playerPos={{ row: 1, col: 2 }} />)
      .container.firstElementChild as Element
  })

  it('sets style > transform > translate appropriately', () => {
    expect(spriteLayer.querySelector('.PLAYER')).to.have.nested.property(
      'style.transform', 'translate(200%, 100%)')
  })
})
