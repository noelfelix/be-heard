import React from 'react'
import { useEvent } from '../useEvent'
describe('useEvent', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return event', () => {
    jest.spyOn(React, 'useState').mockImplementation(() => ['event', undefined] as any)
    jest.spyOn(React, 'useEffect').mockImplementation(() => undefined)
    expect(useEvent('keyup', '' as any)).toEqual('event')
  })

  it('should add event listener with useEffect', () => {
    let eventListener = jest.fn()
    let passedInEventType = ''
    let removeListenerCalled = false
    let removeListener: any
    const object = {
      addEventListener: (eventType: string, onEvent: Function) => {
        eventListener = onEvent as any
        passedInEventType = eventType
      },
      removeEventListener: () => {
        removeListenerCalled = true
      },
    }
    const setEvent = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(() => ['event', setEvent] as any)
    jest.spyOn(React, 'useEffect').mockImplementation((f) => {
      removeListener = f() as any
    })
    useEvent('keyUp', object as any)
    eventListener()
    expect(setEvent).toHaveBeenCalledTimes(1)
    removeListener()
    expect(removeListenerCalled).toBe(true)
    expect(passedInEventType).toEqual('keyUp')
  })
})
