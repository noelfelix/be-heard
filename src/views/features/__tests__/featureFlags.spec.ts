import sessionStorage from 'utils/sessionStorage'
import { getFeatureFlag, getFeatureFlagValue, setFeatureFlag, setFeatureFlagValue } from '../featureFlags'
import availableFeatures from '../availableFeatures'
describe('featureFlags', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getFeatureFlag()', () => {
    it('should return true if value from sessionStorage is true', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => 'true')
      expect(getFeatureFlag('')).toBe(true)
    })

    it('should return false if value from sessionStorage is false', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => 'false')
      expect(getFeatureFlag('')).toBe(false)
    })

    it('should return default if value from sessionStorage is undefined', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => undefined as any)
      jest.spyOn(availableFeatures, 'getAvailableFeatures').mockImplementation(
        () =>
          [
            {
              value: 'flag',
              enabled: true,
            },
          ] as any
      )
      expect(getFeatureFlag('flag')).toBe(true)
    })

    it('should return false if value from sessionStorage is undefined and no defult', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => undefined as any)
      jest.spyOn(availableFeatures, 'getAvailableFeatures').mockImplementation(() => [] as any)
      expect(getFeatureFlag('flag')).toBe(false)
    })
  })

  it('getFeatureFlagValue() should return getItem for feature flag', () => {
    jest.spyOn(sessionStorage, 'getItem').mockImplementation(((key: string) => {
      if (key === 'featureFlags:flag') {
        return true
      }
      return false
    }) as any)
    expect(getFeatureFlagValue('flag')).toBe(true)
  })

  describe('setFeatureFlag()', () => {
    it('should set value to true if enabled', () => {
      const setItemSpy = jest.spyOn(sessionStorage, 'setItem')
      setFeatureFlag('flag', true)
      expect(setItemSpy).toHaveBeenCalledWith('featureFlags:flag', 'true')
    })

    it('should set value to false if not enabled', () => {
      const setItemSpy = jest.spyOn(sessionStorage, 'setItem')
      setFeatureFlag('flag', false)
      expect(setItemSpy).toHaveBeenCalledWith('featureFlags:flag', 'false')
    })
  })

  describe('setFeatureFlagValue()', () => {
    it('should set value to value', () => {
      const setItemSpy = jest.spyOn(sessionStorage, 'setItem')
      setFeatureFlagValue('flag', 'someValue')
      expect(setItemSpy).toHaveBeenCalledWith('featureFlags:flag', 'someValue')
    })
  })
})
