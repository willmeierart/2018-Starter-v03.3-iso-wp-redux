const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config.base.js')

const config = {
  target: 'node',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  externals: [ webpackNodeExternals() ]
}

module.exports = merge(baseConfig, config)
