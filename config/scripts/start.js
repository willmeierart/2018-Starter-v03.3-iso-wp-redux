process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const { exec } = require('child_process');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const isInteractive = process.stdout.isTTY;

const DEFAULT_CLIENT_PORT = parseInt(process.env.PORT, 10) || 3000;
const DEFAULT_SERVER_PORT = parseInt(process.env.PORT, 10) || 5678;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_CLIENT_PORT)
  .then(port => {
    if (port == null) {
      return;
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

    process.env.REACT_APP_CLIENT_PORT = port
    const configWebpackClient = require('../webpack.config.client');

    const compiler = webpack(configWebpackClient);

    const clientServer = new WebpackDevServer(compiler);

    clientServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan(`Starting the client on port ${port}...\n`));

      choosePort(HOST, DEFAULT_SERVER_PORT)
        .then(portServer => {
          if (portServer == null) {
            // We have not found a port.
            return;
          }

          process.env.REACT_APP_SERVER_PORT = portServer;
          const configWebpackServer = require('../webpack.config.server');
          const compiler = webpack(configWebpackServer);
          const urls = prepareUrls(protocol, HOST, portServer);
          let isServerRunning;

          compiler.watch({ // watch options:
            aggregateTimeout: 300,
          }, function(err, stats) {
            if (err)
              console.log('error on webpack server', err);

            if (!isServerRunning) {
              isServerRunning = true
              const nodemon = exec('nodemon --verbose --watch build --exec "node build/server/bundle.js"')

              nodemon.stdout.on('data', function (data) {
                console.log(data.toString());
              });
              nodemon.on('exit', function (code) {
                console.log('nodemon process exited with code ' + code.toString());
              });

              console.log(chalk.yellow(`Starting the server on port ${portServer}...\n`));
              setTimeout(() => { openBrowser(port) }, 1000);
            }
          });
        })
        .catch(err => {
          if (err && err.message) {
            console.log(err.message);
          }
          process.exit(1);
        });
    });
    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        clientServer.close();
        process.exit();
      })
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
      console.error('***142***', err)
      console.error('***143***',err.message)

    }
    process.exit(1);
  });
