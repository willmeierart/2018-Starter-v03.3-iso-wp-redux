const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base.js')

const config = {
  entry: {
    bundle: './src/client/client.jsx',
    polyfills: './config/polyfills.js',
    vendor: './config/vendors.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: 'build/client/'
  },
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
