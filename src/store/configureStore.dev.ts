/* istanbul ignore file */

import { applyMiddleware, compose, createStore } from 'redux'
import { reduxSagaMiddleware, startSagas } from './sagas'
import rootReducer from './rootReducer'

export default function configureStore() {
  const sagaMiddleware = reduxSagaMiddleware()
  const middleware = [sagaMiddleware]

  // Redux Devtools
  const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose

  const enhancers = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(rootReducer, {}, enhancers)
  startSagas()

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
