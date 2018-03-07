const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: ["babel-polyfill", "./src/main.js"],
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: extractPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                }),
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
                options: {
                    presets: ['env', 'react', 'stage-2']
                }
            }
        ]
    },
    plugins: [
        extractPlugin
    ]

};