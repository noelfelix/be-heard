import React, { FC, useState } from 'react'
import PageContainer from 'components/common/PageContainer'
import PageHeadline from 'components/common/PageHeadline'
import availableFeatures, { FeatureFlag } from './availableFeatures'
import featureFlagsUtil from './featureFlags'

export const checkFeatureFlag = (flag: FeatureFlag): boolean => {
  const value = featureFlagsUtil.getFeatureFlag(flag.value)
  if (value === null) {
    return !!flag.enabled
  }
  return value
}

export const Features: FC = () => {
  const [featureFlags, setFeatureFlags] = useState(
    availableFeatures.getAvailableFeatures().map((feature) => {
      return {
        ...feature,
        enabled: checkFeatureFlag(feature),
      }
    })
  )

  const changeFeature = (name: string, enabled: boolean) => {
    featureFlagsUtil.setFeatureFlag(name, enabled)
    setFeatureFlags(
      featureFlags.map((feature) => ({
        ...feature,
        enabled: name === feature.value ? enabled : feature.enabled,
      }))
    )
  }

  return (
    <PageContainer>
      <PageHeadline>Feature Flags</PageHeadline>
      <ul>
        {featureFlags.map((feature, i) => {
          return (
            <li key={feature.value}>
              {feature.label}
              <fieldset id={`feature-flag-${feature.value}`}>
                <label>On</label>
                <input
                  data-test={`features-radio-on-${i}`}
                  type="radio"
                  value="on"
                  checked={feature.enabled}
                  onChange={() => {
                    changeFeature(feature.value, true)
                  }}
                />
                <label>Off</label>
                <input
                  data-test={`features-radio-off-${i}`}
                  type="radio"
                  value="off"
                  checked={!feature.enabled}
                  onChange={() => {
                    changeFeature(feature.value, false)
                  }}
                />
              </fieldset>
            </li>
          )
        })}
      </ul>
    </PageContainer>
  )
}

export default Features
