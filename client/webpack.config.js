var path = require('path');
var scripts = path.resolve(__dirname, "app/scripts");

module.exports = {
    entry: [
        './app/scripts/index.js'
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: scripts
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: scripts,
                query: { presets: ['es2015', 'react'] }
            },
            {
                test: /\.html$/,
                loader: 'html',
                include: scripts
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: scripts
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: path.resolve(__dirname, "app/css")
            }
        ]
    }
};