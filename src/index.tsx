import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import './const/globals'
import App from './components/App'
import i18n from './i18n'
import store from './store'

import './styles/index.scss'

render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App i18n={i18n} />
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
