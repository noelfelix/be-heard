/* istanbul ignore file */

import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'

let sagaMiddleware: SagaMiddleware | null = null

// List of all redux-sagas that are needed.
let sagasToRun: any[] = []

export function reduxSagaMiddleware() {
  sagaMiddleware = createSagaMiddleware()
  return sagaMiddleware
}

// Helper method used by configuration code (configureStore.ts) to start sagas, if any
export function startSagas() {
  if (sagasToRun.length > 0) {
    sagasToRun.forEach((saga) => sagaMiddleware?.run(saga))
  }
  sagasToRun = []
}

// Helper method used by various views to register their sagas.
export default function runSagas(...sagas: any[]) {
  if (!sagaMiddleware) {
    sagas.forEach((saga) => {
      if (typeof saga !== 'function') {
        throw new Error('Saga needs to be a generator function')
      }
      sagasToRun.push(saga)
    })
  } else {
    sagas.forEach((saga) => {
      if (typeof saga !== 'function') {
        throw new Error('Saga needs to be a generator function')
      }
      sagaMiddleware?.run(saga)
    })
  }
}
