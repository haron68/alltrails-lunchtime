import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
import { sendToVercelAnalytics } from './vitals'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals(sendToVercelAnalytics)
