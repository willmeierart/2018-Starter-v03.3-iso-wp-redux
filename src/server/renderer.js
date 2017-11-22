import React from 'react'
import { renderToString } from 'react-dom/server'
import {Provider} from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import serialize from 'serialize-javascript'

import routes from '../client/routes'

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  )
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#ffffff">
          <link rel="manifest" href="/public/manifest.json">
          <link rel="shortcut icon" href="/public/zero.ico">
          <!--<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>--!>
          <title>Agency Zero React App</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
          </script>
        </body>
    </html>
  `
}
