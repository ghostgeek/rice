const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.base.config.js');

module.exports = merge(common, {
    entry: {
        chunk: './src/main.js',
        chunk0: ['vue', 'vue-router', 'axios', 'vuex'],
        chunk1: ['lodash', 'iview']
    },
    output: {
        publicPath: '/dist/',
        filename: 'js/[name]-[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index_temp.html'
        }),
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