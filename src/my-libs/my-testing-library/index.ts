import chai from 'chai'
import sinonChai from 'sinon-chai'
import { callsLike } from 'sinon-chai-calls-assertion'
export { cleanup, render } from '@testing-library/react/pure'
export { expect } from 'chai'
export { a4, each } from '../a4'
export { default as Mooca } from '../mooca'

chai.use(sinonChai)
chai.use(callsLike)
