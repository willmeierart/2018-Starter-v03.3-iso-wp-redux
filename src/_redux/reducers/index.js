import MainDataReducer from './reducer_main_data'
import FunctionalReducer from './reducer_functionals'
// import persist from './persist'

const rootReducer = {
  WPdata: MainDataReducer,
  FnState: FunctionalReducer,
  // persist:persist
}

export default rootReducer
