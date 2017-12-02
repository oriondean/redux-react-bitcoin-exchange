const path = require('path');

const scripts = path.resolve(__dirname, 'app/scripts');

module.exports = {
  entry: path.resolve(scripts, 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: scripts,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: scripts,
        options: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: scripts,
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: scripts,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'app/css'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
};
