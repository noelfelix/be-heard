export const FEATURE_FLAGS = {
  MOCK: 'mock',
  MOCK_USER: 'mockUser',
}

export interface FeatureFlag {
  label: string
  value: string
  enabled?: boolean
}

const availableFeatures: FeatureFlag[] = [
  {
    label: 'Mock Endpoints',
    value: FEATURE_FLAGS.MOCK,
  },
]

export default {
  getAvailableFeatures: () => availableFeatures,
}
