const path = require('path');

const webpack = require('webpack');

const entry = path.resolve(__dirname, 'src/reddio_frontend/entry');
const outputPath = path.resolve(__dirname, 'resources/public/js/compiled');
const outputName = 'bundle.js';

module.exports = {
  entry: entry,
  output: {
    path: outputPath,
    filename: outputName
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
