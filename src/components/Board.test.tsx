import * as React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'

import { describe, it, before, after } from 'mocha'
import { expect } from 'chai'
import { shallow, render, mount } from 'enzyme';

describe(Board.name, () => {
  it('mounts and unmounts', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Board matrix={[[]]} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('creates rows and columns', () => {
    const wrapper = shallow(<Board matrix={[[]]} />)
    expect(wrapper.html()).to.equal('<div><div></div></div>')
  })
})
