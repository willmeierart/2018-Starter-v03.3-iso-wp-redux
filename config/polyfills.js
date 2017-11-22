const rejectionTracking = require('promise/lib/rejection-tracking')
const promise = require('promise/lib/es6-extensions.js')
// const whatWgFetch = require('whatwg-fetch')
const objectAssign = require('object-assign')
const raf = require('raf')

if (typeof Promise === 'undefined') {
  rejectionTracking.enable()
  window.Promise = promise
}

Object.assign = objectAssign

if (process.env.NODE_ENV === 'test') {
  raf.polyfill(global)
}
