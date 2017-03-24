const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envNames = {
    prod: 'production',
    dex: 'development'
};
const isProduction = process.env.NODE_ENV === envNames.prod;

const outputFolder = 'dist';
const outputFolderFullPath = path.resolve(__dirname, outputFolder);
const outputCSSFileName = isProduction ? 'styles-[hash].css' : 'styles.css';

const plugins = [
    new ExtractTextPlugin(outputCSSFileName),
    new webpack.HotModuleReplacementPlugin()
];

if (isProduction) {
    plugins.push(
        new CleanWebpackPlugin([outputFolder], {
            root: __dirname
        })
    );
}

module.exports = {
    entry: './client/client.js',
    output: {
        filename: 'index.js',
        path: outputFolderFullPath,
        publicPath: 'http://localhost:9000/'
    },
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, 'dist'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ],
        modules: [
            path.resolve(__dirname, './client'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react'
                        ],
                        plugins: [
                            'react-hot-loader/babel'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'postcss-loader?sourceMap=inline',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins
};