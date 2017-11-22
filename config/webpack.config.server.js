const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const paths = require('./paths')
const publicPath = paths.servedPath
const publicUrl = publicPath.slice(0, -1)
const getClientEnvironment = require('./env')
const env = getClientEnvironment(publicUrl)
const baseConfig = require('./webpack.config.base.js')

const config = {
  target: "node",
  entry: "./src",
  externals: [ nodeExternals() ],
  output: {
    path: paths.serverBuild,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified)
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  }
}

module.exports = merge(baseConfig, config)
