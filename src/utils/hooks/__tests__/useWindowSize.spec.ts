import React from 'react'
import windowUtils from 'utils/window'
import useWindowSize from '../useWindowSize'

describe('useWindowSize', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add event listener with useEffect with isClient true', () => {
    let eventListener = jest.fn()
    let passedInEventType = ''
    let removeListenerCalled = false
    let removeListener: any
    const setWindowSize = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(() => ['windowSize', setWindowSize] as any)
    jest.spyOn(React, 'useEffect').mockImplementation((f) => {
      removeListener = f() as any
    })
    jest.spyOn(windowUtils, 'isClient').mockImplementation(() => true)
    jest.spyOn(windowUtils, 'getWindowWidth').mockImplementation(() => 20)
    jest.spyOn(windowUtils, 'getWindowHeight').mockImplementation(() => 10)
    jest.spyOn(windowUtils, 'addEventListener').mockImplementation(((eventType: string, onEvent: Function) => {
      passedInEventType = eventType
      eventListener = onEvent as any
    }) as any)
    jest.spyOn(windowUtils, 'removeEventListener').mockImplementation((() => {
      removeListenerCalled = true
    }) as any)
    expect(useWindowSize()).toEqual('windowSize')
    eventListener()
    expect(setWindowSize).toHaveBeenCalledWith({
      width: 20,
      height: 10,
    })
    removeListener()
    expect(removeListenerCalled).toBe(true)
    expect(passedInEventType).toEqual('resize')
  })

  it('should add event listener with useEffect with isClient false', () => {
    let removeListener: any
    const setWindowSize = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(() => ['windowSize', setWindowSize] as any)
    jest.spyOn(React, 'useEffect').mockImplementation((f) => {
      removeListener = f() as any
    })
    jest.spyOn(windowUtils, 'isClient').mockImplementation(() => false)
    const addEventListenerSpy = jest.spyOn(windowUtils, 'addEventListener')
    expect(useWindowSize()).toEqual('windowSize')
    expect(removeListener).toBeUndefined()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(0)
  })
})
