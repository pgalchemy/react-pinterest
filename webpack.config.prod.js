'use strict';

const webpack = require('webpack');
const base = require('./webpack.config.base');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                },
                sourceMap: true,
            }),
        ],
    },
    output: {
        filename: 'react-pinterest.min.js',
    },
});
