const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envNames = {
    prod: 'production',
    dex: 'development'
};
const isProduction = process.env.NODE_ENV === envNames.prod;

const outputFolder = 'server/public/dist';
const outputFolderFullPath = path.resolve(__dirname, outputFolder);
const outputCSSFileName = isProduction ? 'styles.css' : 'styles.css';

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
    devtool: 'inline-source-map',
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
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react',
                            'stage-0'
                        ],
                        plugins: [
                            'react-hot-loader/babel'
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
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
            },
            {
                test: /\.png$/,
                use: [
                    'url-loader?limit=10000'
                ]
            }
        ]
    },
    plugins
};
