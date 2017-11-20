mport axios from 'axios'
import { CHECK_BROWSER, FETCH_WP_PAGES, FETCH_WP_POSTS } from './types'

const BASE_URL = '/'
const PAGES_URL = `${BASE_URL}/wp-json/wp/v2/pages`
const POSTS_URL = `${BASE_URL}/wp-json/wp/v2/posts`

export function fetchWPpages(){
  const request = axios.get(PAGES_URL).then(res=>res)
  return {
    type: FETCH_WP_PAGES,
    payload: request
  }
}
export function fetchWPposts(){
  const request = axios.get(POSTS_URL).then(res=>res)
  return {
    type: FETCH_WP_POSTS,
    payload: request
  }
}

export function checkBrowser(){
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
  return {
    type: CHECK_BROWSER,
    payload: browser
  }
}
