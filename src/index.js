/* eslint-disable */
import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import routes from './client/routes'
import renderer from './server/renderer'
import serverStore from './_redux/serverStore'

const app = express()
const API_URL = '/'

app.use('/api', proxy(API_URL, {
  // headers, etc.
}))
app.use(express.static('public'))
app.get('*', (req, res) => {
  const store = serverStore(req)

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null
    }).map(promise => {
      if (promise) {
        return new Promise((resolve) =>
          promise.then(resolve).catch(resolve))
      }
    })

  Promise.all(promises).then(() => {
    const context = {}
    const content = renderer(req, store, context)

    if (context.url) {
      return res.redirect(301, context.url)
    }

    if (context.notFound) {
      res.status(404)
    }

    res.send(content)
  })
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
