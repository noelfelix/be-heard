import React from 'react'
import { shallow } from 'enzyme'

import documentUtils from 'utils/document'
import featureFlags from 'views/features/featureFlags'
import { FEATURE_FLAGS } from 'views/features/availableFeatures'

import { App } from '../App'
import appUtils from '../appUtils'
import { THEME } from 'utils/theme'
import iframe from 'utils/iframe'
import windowUtils from 'utils/window'
import { rootContext } from 'const/globals'

describe('App', () => {
  let props: any, useEffect: jest.SpyInstance

  const mockUseEffect = () => {
    useEffect.mockImplementation((f) => f())
  }

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect')
    props = {
      loadAccount: jest.fn(),
      account: {
        accountSettings: 'settings',
      },
      navigation: {
        visible: true,
      },
      i18n: {
        changeLanguage: jest.fn(),
      },
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render App default', () => {
    jest.spyOn(appUtils, 'renderDevFlag').mockImplementationOnce(() => <div>flag</div>)
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should render App no flag', () => {
    jest.spyOn(appUtils, 'renderDevFlag').mockImplementationOnce(() => null as any)
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should render spinner when no error and loading', () => {
    props.account.loading = true
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should render spinner when no error and accountSettings is undefined', () => {
    props.account.accountSettings = undefined
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should not render spinner when error and is loading', () => {
    props.account.loading = true
    props.account.results = {
      error: 'some error',
    }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should call setFeatureFlag and setFeatureFlagValues if useMocks is true and mockUser is set', () => {
    mockUseEffect()
    jest.spyOn(documentUtils, 'urlSearchParams').mockImplementation(
      () =>
        ({
          get: (value: string) => {
            if (value === 'useMocks') {
              return 'true'
            }
            if (value === 'mockUser') {
              return 'user1'
            }
            return undefined
          },
        } as any)
    )
    const setFeatureFlagSpy = jest.spyOn(featureFlags, 'setFeatureFlag')
    const setFeatureFlagValueSpy = jest.spyOn(featureFlags, 'setFeatureFlagValue')
    shallow(<App {...props} />)
    expect(setFeatureFlagSpy).toHaveBeenCalledWith(FEATURE_FLAGS.MOCK, true)
    expect(setFeatureFlagValueSpy).toHaveBeenCalledWith(FEATURE_FLAGS.MOCK_USER, 'user1')
    expect(props.loadAccount).toHaveBeenCalledTimes(1)
  })

  it('should not call setFeatureFlag and setFeatureFlagValues if useMocks and mockUser is undefined', () => {
    mockUseEffect()
    jest.spyOn(documentUtils, 'urlSearchParams').mockImplementation(
      () =>
        ({
          get: () => undefined,
        } as any)
    )
    const setFeatureFlagSpy = jest.spyOn(featureFlags, 'setFeatureFlag')
    const setFeatureFlagValueSpy = jest.spyOn(featureFlags, 'setFeatureFlagValue')
    shallow(<App {...props} />)
    expect(setFeatureFlagSpy).toHaveBeenCalledTimes(0)
    expect(setFeatureFlagValueSpy).toHaveBeenCalledTimes(0)
    expect(props.loadAccount).toHaveBeenCalledTimes(1)
  })

  it('should call `toggleRootClassStyle` twice when theme is set', () => {
    mockUseEffect()
    props.account.theme = THEME.DARK
    const toggleRootClassStyleSpy = jest.spyOn(appUtils, 'toggleRootClassStyle')
    shallow(<App {...props} />)
    expect(toggleRootClassStyleSpy).toHaveBeenCalledWith(THEME.DARK)
    expect(toggleRootClassStyleSpy).toHaveBeenCalledTimes(2)
  })

  it('should call `toggleRootClassStyle` once when theme is not set', () => {
    mockUseEffect()
    const toggleRootClassStyleSpy = jest.spyOn(appUtils, 'toggleRootClassStyle')
    shallow(<App {...props} />)
    expect(toggleRootClassStyleSpy).toHaveBeenCalledWith(undefined)
    expect(toggleRootClassStyleSpy).toHaveBeenCalledTimes(1)
  })

  it('should call changeLanguage and postMessage when language is set', () => {
    mockUseEffect()
    props.account.language = 'language'
    const postMessageSpy = jest.spyOn(iframe, 'postMessage')
    shallow(<App {...props} />)
    expect(props.i18n.changeLanguage).toHaveBeenCalledTimes(1)
    expect(postMessageSpy).toHaveBeenCalledWith({
      actonSetLanguage: props.account.language,
    })
  })

  it('should call setLocationHref when loggedOut is true', () => {
    mockUseEffect()
    props.account.loggedOut = true
    const setLocationHrefSpy = jest.spyOn(windowUtils, 'setLocationHref')
    shallow(<App {...props} />)
    expect(setLocationHrefSpy).toHaveBeenCalledWith(`${rootContext}/`)
  })

  it('should not call setLocationHref when loggedOut is not true', () => {
    mockUseEffect()
    const setLocationHrefSpy = jest.spyOn(windowUtils, 'setLocationHref')
    shallow(<App {...props} />)
    expect(setLocationHrefSpy).toHaveBeenCalledTimes(0)
  })

  it('should call renderCustomStylesheet when hasCustomSkin and theme equals CUSTOM', () => {
    props.account.accountSettings = {
      hasCustomSkin: true,
    }
    props.account.theme = THEME.CUSTOM
    const renderCustomStylesheetSpy = jest.spyOn(appUtils, 'renderCustomStylesheet')
    shallow(<App {...props} />)
    expect(renderCustomStylesheetSpy).toHaveBeenCalledTimes(1)
  })

  it('should not call renderCustomStylesheet when does not have hasCustomSkin and theme equals CUSTOM', () => {
    props.account.accountSettings = {
      hasCustomSkin: false,
    }
    props.account.theme = THEME.CUSTOM
    const renderCustomStylesheetSpy = jest.spyOn(appUtils, 'renderCustomStylesheet')
    shallow(<App {...props} />)
    expect(renderCustomStylesheetSpy).toHaveBeenCalledTimes(0)
  })

  it('should not call renderCustomStylesheet when hasCustomSkin and theme does not equal CUSTOM', () => {
    props.account.accountSettings = {
      hasCustomSkin: true,
    }
    props.account.theme = THEME.DARK
    const renderCustomStylesheetSpy = jest.spyOn(appUtils, 'renderCustomStylesheet')
    shallow(<App {...props} />)
    expect(renderCustomStylesheetSpy).toHaveBeenCalledTimes(0)
  })
})
