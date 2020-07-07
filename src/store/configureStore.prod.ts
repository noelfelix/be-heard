/* istanbul ignore file */

import { applyMiddleware, createStore } from 'redux'
import { reduxSagaMiddleware, startSagas } from './sagas'
import rootReducer from './rootReducer'

export default function configureStore() {
  const sagaMiddleware = reduxSagaMiddleware()
  const middleware = [sagaMiddleware]
  const enhancers = applyMiddleware(...middleware)

  const store = createStore(rootReducer, {}, enhancers)
  startSagas()
  return store
}
