import { expect } from 'chai'
import Mooca from '../lib/Mooca'
import * as a from './module-a'
import * as b from './module-b'

describe(Mooca.name, () => {

  describe(Mooca.prototype.stub.name, () => {
    let mooca: Mooca

    before(() => {
      mooca = new Mooca()
    })

    after(() => {
      mooca.restore()
    })

    context("default export", () => {
      before(() => {
        mooca.stub(a, () => 'stubbed-a')
      })

      it('replaces default export with stubbed value', () => {
        expect(a.default()).to.equal('stubbed-a')
      })
    })

    context("named export", () => {
      before(() => {
        mooca.stub(a, 'y', () => ({ district: 'Mooca' }))
      })

      it('replaces named export with stubbed value', () => {
        expect(a.y()).to.deep.equal({ district: 'Mooca' })
      })
    })
  })

  describe(Mooca.prototype.restore.name, () => {
    const mooca = new Mooca

    before(() => {
      mooca.stub(a, () => 'stubbed-a')
      mooca.stub(a, 'y', () => ({ district: 'Mooca' }))
      mooca.stub(b, () => 'stubbed-b')
      mooca.restore()
    })

    it('restores original exported values', () => {
      expect(a.default()).to.equal('default-a')
      expect(a.y()).to.deep.equal({ district: 'Jabaquara' })
      expect(b.default()).to.equal('default-b')
    })
  })
})
