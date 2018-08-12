const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    devtool: 'hidden-source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin()
    ],
    devServer: { //--content-base ./ --open --inline --hot --compress --history-api-fallback
        contentBase: "./",
        historyApiFallback: true,
        inline: true,
        compress: true,
        port: 8080,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://192.168.2.116:8080',
                changeOrigin: true,
                secure: false
            }
        }
    }
});