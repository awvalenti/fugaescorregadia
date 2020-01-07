import { expect } from 'chai'
import Mooca from '../lib/Mooca'
import * as a from './module-a'
import defA, { x, y } from './module-that-uses-a'
import * as b from './module-b'
import defB from './module-that-uses-b'

describe(Mooca.name, () => {

  context('before acting', () => {
    it('keeps original values', () => {
      expect(defA()).to.equal('default-a')
      expect(x(10)).to.equal(11)
      expect(y()).to.deep.equal({ district: 'Jabaquara' })

      expect(defB()).to.equal('default-b')
    })
  })

  const mooca = new Mooca

  describe(mooca.stub.name, () => {
    before(() => {
      mooca.stub(a, 'default', () => 'stubbed-a')
      mooca.stub(a, 'x', (n: number) => n - 1)
      mooca.stub(a, 'y', () => ({ district: 'Mooca' }))

      mooca.stub(b, () => 'stubbed-b')
    })

    it('stubs named exports', () => {
      expect(defA()).to.equal('stubbed-a')
      expect(x(10)).to.equal(9)
      expect(y()).to.deep.equal({ district: 'Mooca' })
    })

    it('stubs default exports', () => {
      expect(defB()).to.equal('stubbed-b')
    })

    describe(mooca.restore.name, () => {
      before(() => {
        mooca.restore()
      })

      it('restores original values', () => {
        expect(defA()).to.equal('default-a')
        expect(x(10)).to.equal(11)
        expect(y()).to.deep.equal({ district: 'Jabaquara' })

        expect(defB()).to.equal('default-b')
      })
    })
  })

})
