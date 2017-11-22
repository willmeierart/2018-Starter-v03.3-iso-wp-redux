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
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },
            loader: 'eslint-loader'
          }
        ],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options:{
          // presets:[
          //   'react-app',
          //   'stage-0',
          //   ['env', {targets:{browsers:['last 2 versions']}}]
          // ],
          cacheDirectory:true
        }
      },
      {
        exclude: [
          /\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit:40000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  }
}
