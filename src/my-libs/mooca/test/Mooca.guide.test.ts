import { expect } from 'chai'
import Mooca from '../lib/Mooca'
import * as moduleA from './module-a'
import * as moduleB from './module-b'
import aDefault, { x } from './module-that-uses-a'
import bDefault, { y } from './module-that-uses-b'

describe(Mooca.name, () => {

  it('stubs default export', () => {
    const mooca = new Mooca()
    mooca.stub(moduleA, () => 'stubbed-a')
    expect(aDefault()).to.equal('stubbed-a')
  })

  it('stubs named export', () => {
    const mooca = new Mooca()
    mooca.stub(moduleA, 'x', (n) => n - 1)
    expect(x(1)).to.equal(0)
  })

  it('restores all stubs to original values', () => {
    const mooca = new Mooca()
    mooca.stub(moduleB, () => 'stubbed-b')
    mooca.stub(moduleB, 'y', () => 'stubbed-y')
    mooca.restore()
    expect(bDefault()).to.equal('default-b')
    expect(y()).to.equal('y')
  })

})
