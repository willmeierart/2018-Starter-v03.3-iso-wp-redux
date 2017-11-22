const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base.js')

const config = {
  entry: {
    bundle: path.resolve(__dirname, '../src/client/client.jsx'),
    polyfills: path.resolve(__dirname, './polyfills.js'),
    vendor: path.resolve(__dirname, './vendors.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: 'build/client/'
  },
  module: {
    rules: [
      {
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills', 'manifest']
    }),
    // new HtmlWebpackPlugin({
    //   template: 'public/index.html'
    // })
  ]
}

module.exports = merge(baseConfig, config)
