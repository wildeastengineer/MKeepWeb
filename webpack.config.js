const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const envNames = {
    prod: 'production',
    dex: 'development'
};
const isProduction = process.env.NODE_ENV === envNames.prod;

const outputCSSFileName = isProduction ? 'styles-[hash].css' : 'styles.css';

const plugins = [
    new ExtractTextPlugin(outputCSSFileName)
];

module.exports = {
    entry: './client/App.jsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000
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
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins
};