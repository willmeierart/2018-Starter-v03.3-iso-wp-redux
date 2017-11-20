import { CHECK_BROWSER } from '../actions'

const initialState = {
  browser: 'unknown'
}

export default function MainDataReducer(state=initialState, action){
  switch(action.type){
    case CHECK_BROWSER:{
      const newState = {...state}
      newState.browser = action.payload
      return newState
    }
    default:
      return state
  }
}
