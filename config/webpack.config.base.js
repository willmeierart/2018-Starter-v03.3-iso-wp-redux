const path = require('path')
const webpack = require('webpack')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    extensions: [
      '.js', '.jsx'
    ]
  },
  module:{
    rules:[
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options:{
          presets:[
            require.resolve('babel-preset-react-app'),
            require.resolve('babel-preset-stage-0'),
            [require.resolve('babel-preset-env'), {targets:{browsers:['last 2 versions'], node:"current"}}]
          ],
          cacheDirectory:true
        }
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        exclude: /node_modules/
      },
      {
        exclude: [
          /\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: { limit:40000 }
          },
          require.resolve('image-webpack-loader')
        ]
      }
    ]
  }
}
