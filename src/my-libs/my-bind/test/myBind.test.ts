import { a3, expect } from '../../my-testing-library'
import myBind from '../lib/myBind'

a3(myBind, {

  arrange: () => ({
    field: 'inside-the-object',
    method() {
      return this.field
    },
  }),

  act: object => {
    myBind(object, 'method')
    return { methodSeparatedFromObject: object.method }
  },

  assert: {
    'binds method to object': ({ methodSeparatedFromObject }) => {
      expect(methodSeparatedFromObject()).to.equal('inside-the-object')
    },
  },

})
