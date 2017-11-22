const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const path = require('path');
const config = require('./webpack.config.client');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: 'public',
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: new RegExp(
      `^(?!${path
        .normalize(path.resolve(__dirname))
        .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
      'g'
    ),
  },
  https: protocol === 'https',
  host: host,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
  before(app) {
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  }
}
// setup(app) {
//   if(window!==undefined){
//     app.use(errorOverlayMiddleware());
//   }
//   app.use(noopServiceWorkerMiddleware());
// }
