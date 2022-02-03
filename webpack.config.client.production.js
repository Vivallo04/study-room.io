const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ], output:  {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        favicon: "./assets/static/favicon.ico"
    })
    ],
}

module.exports = config;