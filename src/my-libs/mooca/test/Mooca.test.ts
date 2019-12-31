import { expect } from 'chai'
import Mooca from '../lib/Mooca'
import * as a from './module-a'
import def, { x, y } from './module-that-uses-a'

describe(Mooca.name, () => {

  context('before acting', () => {
    it('keeps original values', () => {
      expect(def()).to.equal('default')
      expect(x(10)).to.equal(11)
      expect(y()).to.deep.equal({ district: 'Jabaquara' })
    })
  })

  const mooca = new Mooca

  describe(mooca.stub.name, () => {
    before(() => {
      mooca.stub(a, 'default', () => 'stubbed')
      mooca.stub(a, 'x', (n: number) => n - 1)
      mooca.stub(a, 'y', () => ({ district: 'Mooca' }))
    })

    it('stubs exports', () => {
      expect(def()).to.equal('stubbed')
      expect(x(10)).to.equal(9)
      expect(y()).to.deep.equal({ district: 'Mooca' })
    })

    describe(mooca.restore.name, () => {
      before(() => {
        mooca.restore()
      })

      it('restores original values', () => {
        expect(def()).to.equal('default')
        expect(x(10)).to.equal(11)
        expect(y()).to.deep.equal({ district: 'Jabaquara' })
      })
    })
  })

})
