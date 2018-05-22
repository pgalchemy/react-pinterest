var shims = require('./shim');
// Provide Babel and Webpack support to Jest for testing React components
var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');

module.exports = {
    process: function(src, filename) {
        if (filename.indexOf('node_modules') === -1) {
            src = babelJest.process(src, filename);
            src = webpackAlias.process(src, filename);
        }
        return src;
    },
};
