
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { join, resolve } = require('path');

module.exports = {
    output: {
        path: join(__dirname, '../dist'),
        publicPath: '/',
        filename: 'scripts/[name].[contenthash:5].bundule.js',
        assetModuleFilename: 'images/[name].[contenthash:5][ext]',
    },
    // experiments: {
    //     outputModule: true,
    // },
    performance: {
        maxAssetSize: 250000,
        maxEntrypointSize: 250000,
        hints: 'warning',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
            }),
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },
    plugin: [new HtmlWebpackPlugin({
        title: 'Yideng',
        filename: 'index.html',
        template: resolve(__dirname, '../src/index-prod.html'),
        favicon: './public/favicon.ico',
    })]
};