import React from 'react'
import { shallow } from 'enzyme'
import Features, { checkFeatureFlag } from '../Features'

import { FEATURE_FLAGS } from '../availableFeatures'
import featureFlagsUtil from '../featureFlags'
// import sessionStorage from 'utils/sessionStorage'

describe('Features', () => {
  let getFeatureFlagSpy: jest.SpyInstance, setFeatureFlagSpy: jest.SpyInstance
  beforeEach(() => {
    getFeatureFlagSpy = jest.spyOn(featureFlagsUtil, 'getFeatureFlag')
    setFeatureFlagSpy = jest.spyOn(featureFlagsUtil, 'setFeatureFlag')
  })

  it('should render component in default state', () => {
    const wrapper = shallow(<Features />)
    expect(getFeatureFlagSpy).toHaveBeenCalledWith(FEATURE_FLAGS.MOCK)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should toggle a feature on', () => {
    const wrapper = shallow(<Features />)
    wrapper.find({ 'data-test': 'features-radio-on-0' }).props().onChange()
    expect(setFeatureFlagSpy).toHaveBeenCalledWith(FEATURE_FLAGS.MOCK, true)
  })

  it('should toggle a feature off', () => {
    const wrapper = shallow(<Features />)
    wrapper.find({ 'data-test': 'features-radio-off-0' }).props().onChange()
    expect(setFeatureFlagSpy).toHaveBeenCalledWith(FEATURE_FLAGS.MOCK, false)
  })

  describe('checkFeatureFlag()', () => {
    it('should return flag.enabled if value is null', () => {
      getFeatureFlagSpy.mockImplementation(() => null as any)
      expect(checkFeatureFlag({ enabled: true } as any)).toBe(true)
    })
  })
})
