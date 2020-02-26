import { expect } from 'chai'
import Mooca from '../lib/Mooca'

describe(Mooca.name, () => {

  describe(Mooca.prototype.stub.name, () => {
    context('when property name is specified', () => {
      it('replaces original value with stubbed value', () => {
        const mooca = new Mooca
        const obj = { a: 1 }
        mooca.stub(obj, 'a', 2)
        expect(obj.a).to.equal(2)
      })
    })

    context('when property name is not specified', () => {
      it('replaces original value of "default" with stubbed value', () => {
        const mooca = new Mooca
        const obj = { default: 1 }
        mooca.stub(obj, 2)
        expect(obj.default).to.equal(2)
      })
    })
  })

  describe(Mooca.prototype.restore.name, () => {
    it('restores stubbed properties to original values', () => {
      const mooca = new Mooca
      const obj = { a: 10, default: 20 }
      mooca.stub(obj, 'a', 11)
      mooca.stub(obj, 21)
      mooca.restore()
      expect(obj.a).to.equal(10)
      expect(obj.default).to.equal(20)
    })
  })

})
