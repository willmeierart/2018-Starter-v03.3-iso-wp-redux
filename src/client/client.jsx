import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './utils/registerServiceWorker'

import AppProvider from '../_redux/clientProvider.jsx'

ReactDOM.hydrate(
  <AppProvider/>,
  document.getElementById('root'),
)

registerServiceWorker()
