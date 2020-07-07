import React from 'react'
import { shallow } from 'enzyme'
import PageError from '../PageError'

describe('PageError', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PageError />)

    expect(wrapper.debug()).toMatchSnapshot()
  })
})
