/**
 * Created by xiaodan on 16/4/5.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query:
      {
        presets:['react']
      }
    }, {
      test: /\.css$/,
      loader: ['style', 'css']
    }],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        'node_modules'
      ]
    },
  }
};