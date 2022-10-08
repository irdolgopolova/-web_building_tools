const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'main.[contenthash].js'
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
          template: resolve(__dirname, './index.html'),
        }),
        new CopyPlugin({
            patterns: [
              {
                from: "src/assets",
                to: "src/assets",
                toType: "dir",
              },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|mp3)$/i,
                use: 'file-loader',
                type: 'asset/resource',
            }
        ]
    },
    devServer: {
        port: 3000
    }
};