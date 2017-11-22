import { FETCH_WP_PAGES, FETCH_WP_POSTS } from '../actions/types'

const initialState = {
  allPages: [],
  allPosts: [],
}

export default function MainDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WP_PAGES: {
      const newState = { ...state }
      const sorted = action.payload.data.sort((a, b) => a.id - b.id)
      console.log(action.payload.data);
      newState.allPages = sorted
      return newState
    }
    case FETCH_WP_POSTS: {
      const newState = { ...state }
      newState.allPosts = action.payload.data
      return newState
    }
    default:
      return state
  }
}
