'use strict';

var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
        ],
    },
    output: {
        filename: 'react-pinterest.js',
    },
    resolve: {
        extensions: ['.js'],
    },
};
