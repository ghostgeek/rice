const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.base.config.js');

module.exports = merge(common, {
    devtool: 'source-map'
});