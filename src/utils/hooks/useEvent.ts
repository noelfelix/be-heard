import React from 'react'

export function useEvent(eventType: string, object: EventTarget = window) {
  const [event, setEvent] = React.useState<Event | null>(null)

  React.useEffect(() => {
    function onEvent(event: Event) {
      setEvent(event)
    }

    object.addEventListener(eventType, onEvent)
    return () => object.removeEventListener(eventType, onEvent)
  }, [])

  return event
}

export default {
  useEvent,
}
