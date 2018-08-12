const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.base.config.js');

module.exports = merge(common, {
    output: {
        publicPath: '/dist/',
        filename: '[name]-[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]-[hash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin(),
        // 公共的
        new webpack.optimize.CommonsChunkPlugin({
            name: ['chunk0', 'chunk1']
        }),
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
});