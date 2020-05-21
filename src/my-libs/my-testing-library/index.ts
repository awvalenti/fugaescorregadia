import chai from 'chai'
import sinonChai from 'sinon-chai'

export { cleanup, render } from '@testing-library/react/pure'
export { expect } from 'chai'
export { a3, each } from '../a3'
export { default as Mooca } from '../mooca'

chai.use(sinonChai)
