import availableFeatures from './availableFeatures'
import sessionStorage from 'utils/sessionStorage'

export const getFeatureFlag = (name: string): boolean | null => {
  const value = sessionStorage.getItem(`featureFlags:${name}`)
  if (value === undefined) return availableFeatures.getAvailableFeatures().find((feature) => feature.value === name)?.enabled || false
  return value === 'true'
}

export const getFeatureFlagValue = (name: string): string | null => {
  return sessionStorage.getItem(`featureFlags:${name}`)
}

export const setFeatureFlag = (name: string, enabled: boolean) => sessionStorage.setItem(`featureFlags:${name}`, enabled ? 'true' : 'false')

export const setFeatureFlagValue = (name: string, value: string) => sessionStorage.setItem(`featureFlags:${name}`, value)

export default {
  getFeatureFlag,
  getFeatureFlagValue,
  setFeatureFlag,
  setFeatureFlagValue,
}
