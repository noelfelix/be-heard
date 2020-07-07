import React from 'react'
import { shallow } from 'enzyme'
import globals from 'const/globals'
import Routes from '../Routes'

describe('Routes', () => {
  it('render Routes default', () => {
    const wrapper = shallow(<Routes />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('render Routes for production', () => {
    jest.spyOn(globals, 'isProd').mockImplementation(() => true)
    const wrapper = shallow(<Routes />)
    expect(wrapper.debug()).toMatchSnapshot()
  })
})
