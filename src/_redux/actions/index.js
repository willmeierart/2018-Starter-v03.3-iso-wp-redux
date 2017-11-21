import { CHECK_BROWSER, FETCH_WP_PAGES, FETCH_WP_POSTS } from './types'

const PAGES_URL = `/wp-json/wp/v2/pages`
const POSTS_URL = `/wp-json/wp/v2/posts`

export const fetchWPpages=()=>async(dispatch, getState, api)=>{
  const request = await api.get(PAGES_URL)
  dispatch({
    type: FETCH_WP_PAGES,
    payload: request
  })
}
export const fetchWPposts=()=>async(dispatch, getState, api)=>{
  const request = await api.get(POSTS_URL)
  dispatch({
    type: FETCH_WP_POSTS,
    payload: request
  })
}

export const checkBrowser=()=>async(dispatch)=>{
  let browser = 'unknown'
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
    browser = 'opera'
  } else if(navigator.userAgent.indexOf("chrome") != -1 ){
    browser = 'chrome'
  } else if(navigator.userAgent.indexOf("Safari") != -1){
    browser = 'safari'
  } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
    browser = 'firefox'
  } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
    browser = 'ie'
  }
  dispatch({
    type: CHECK_BROWSER,
    payload: browser
  })
}
