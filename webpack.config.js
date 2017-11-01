const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

let pathsToClean = [
    'dist'
]

let cleanOptions = {
    watch: true
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.scss$/, 
            use: extractSass.extract({
                use: [{
                    loader: "css-loader", options: {
                        sourceMap: true
                    }

                }, {
                    loader: "sass-loader",
                    options: {
                        data: "$env: " + process.env.NODE_ENV + ";",
                        sourceMap: true
                    }
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            title: "Paint Application",
            minify: {
                collapseWhitespace: false
            }
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
          })
    ]
};