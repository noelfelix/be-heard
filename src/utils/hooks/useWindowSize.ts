import React from 'react'
import windowUtils from 'utils/window'

export function getSize(isClient: boolean) {
  return {
    width: isClient ? windowUtils.getWindowWidth() : undefined,
    height: isClient ? windowUtils.getWindowHeight() : undefined,
  }
}

export default function useWindowSize() {
  const isClient = windowUtils.isClient()

  const [windowSize, setWindowSize] = React.useState(getSize(isClient))

  React.useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      setWindowSize(getSize(isClient))
    }

    windowUtils.addEventListener('resize', handleResize)
    return () => windowUtils.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
