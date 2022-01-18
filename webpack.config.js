const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'app-client.js'),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
        }
    },
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: './dist',
    },
  };