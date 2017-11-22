import 'babel-polyfill'
import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise'
// import {persistCombineReducers} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducers from './reducers'

// const config={key:'root', storage}
// const reducer = persistCombineReducers(config, reducers)

// const Store = compose(
//   applyMiddleware(promise, logger, thunk),
// )(createStore)(reducer)
export default () =>
  createStore(
    reducers, {},
    compose(
      applyMiddleware(promise, logger, thunk),
    ),
  )
