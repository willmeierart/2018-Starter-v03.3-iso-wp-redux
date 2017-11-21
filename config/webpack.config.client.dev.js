const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const baseConfig = require('./webpack.config.base')
const paths = require('./paths')

const config = {
  entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('react-error-overlay'),
    paths.appClientIndex
  ],
  output: {
    path: paths.clientBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    hotUpdateChunkFilename: 'static/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'static/[hash].hot-update.json',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders:1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: ()=>[
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  performance: {
    hints: false
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}

module.exports = merge(baseConfig, config)
