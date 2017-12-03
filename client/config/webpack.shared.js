const path = require('path');

const root = path.resolve(__dirname, '..');
const scripts = path.resolve(root, 'app/scripts');
const styles = path.resolve(root, 'app/css');
const dist = path.resolve(root, 'dist');

module.exports = {
  entry: path.resolve(scripts, 'index.jsx'),
  output: {
    path: dist,
    filename: 'bundle.js',
  },
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
        include: styles,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
};
