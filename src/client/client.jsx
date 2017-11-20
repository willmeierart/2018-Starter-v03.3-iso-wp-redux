import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import AppProvider from '../redux/clientProvider'

ReactDOM.hydrate(
  <AppProvider/>,
  document.getElementById('root')
)

registerServiceWorker()
