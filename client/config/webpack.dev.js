const webpack = require('webpack');
const merge = require('webpack-merge');
const shared = require('./webpack.shared.js');

module.exports = merge(shared, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
});
