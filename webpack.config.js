const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config');

const entry = path.resolve(__dirname, 'src/reddio_frontend/index');
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
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEFINE__: JSON.stringify(config)
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
