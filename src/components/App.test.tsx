import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import BackgroundLayer from './BackgroundLayer'

describe(App.name, () => {
  after(cleanup)

  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  const real = BackgroundLayer

  before(() => {
    const { name } = BackgroundLayer
    const stub: typeof BackgroundLayer = () => <>{name}</>
    // @ts-ignore
    BackgroundLayer = stub
  })

  after(() => {
    // @ts-ignore
    BackgroundLayer = real
  })

  let innerHTML: string

  before(() => {
    ({ container: { innerHTML } } = render(<App />))
  })

  it(`renders <${BackgroundLayer.name}>`, () => {
    expect(innerHTML).to.equal('BackgroundLayer')
  })
})
