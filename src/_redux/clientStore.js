/* eslint-disable function-paren-newline */
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise'
import storage from 'redux-persist/es/storage'
import { persistCombineReducers } from 'redux-persist'

import reducers from './reducers'

const config = { key: 'root', storage }
const reducer = persistCombineReducers(config, reducers)
// const Store = compose(
//   applyMiddleware(promise, logger, thunk),
// )(createStore)(reducer)
const Store = createStore(
  reducer,
  window.INITIAL_STATE,
  compose(
    applyMiddleware(promise, logger, thunk),
  ),
)

export default Store
