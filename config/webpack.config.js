const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');

module.exports = {

  entry: './client/index.js',
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader'},
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    // new webpack.EnvironmentPlugin({
    //   'NODE_ENV': 'production'
    // })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'

};