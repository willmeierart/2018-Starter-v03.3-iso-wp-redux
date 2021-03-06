import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BrowserRouter as Router} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Loader } from 'react-loaders'

import Store from './clientStore'
import routes from '../client/routes'


const Persistor = persistStore(Store)
const onBeforeLift = () => {
  // take some action before the gate lifts
}
export default function AppProvider(){
  return (
    <Provider store={Store}>
      <PersistGate
          loading={
            <Loader type="line-spin-fade-loader" active/>
          }
          onBeforeLift={onBeforeLift}
          persistor={Persistor}>
        <Router>
          <div>{ renderRoutes(routes) }</div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

// redux-perist options:
// {
//   key: string, // the key for the persist
//   storage: Object, // the storage adapter, following the AsyncStorage api
//   version?: number, // the state version as an integer (defaults to -1)
//   blacklist?: Array<string>, // do not persist these keys
//   whitelist?: Array<string>, // only persist they keys
//   migrate?: (Object, number) => Promise<Object>,
//   transforms?: Array<Transform>,
//   throttle?: number,
//   keyPrefix?: string, // will be prefixed to the storage key
//   debug?: boolean, // true -> verbose logs
//   stateReconciler?: false | StateReconciler, // false -> do not automatically reconcile state
// }
