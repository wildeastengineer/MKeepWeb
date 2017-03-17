const path = require('path');

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
                use: 'css-loader'
            }
        ]
    }
};