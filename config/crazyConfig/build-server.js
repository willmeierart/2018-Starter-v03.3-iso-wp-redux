process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const config = require('../webpack.config.server');
const paths = require('../paths');

const assetManifest = require('../../build/client/asset-manifest.json') || null
if (!assetManifest) {
  console.log(chalk.red('No assets-manifest.json found. Did you run the build-client script?.\n'));
}

process.env.REACT_APP_ASSET_MANIFEST = JSON.stringify(assetManifest);

function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  fs.emptyDirSync(paths.serverBuild);

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (process.env.CI && messages.warnings.length) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  })
}

build()
  .then( ({ stats, previousFileSizes, warnings }) => {
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      );
      console.log(
        'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }
  })
