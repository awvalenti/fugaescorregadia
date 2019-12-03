import * as React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'

import { describe, it } from 'mocha'

describe(Board.name, () => {
  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Board />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
