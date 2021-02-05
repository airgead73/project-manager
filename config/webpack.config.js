const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const getNonce = require('../env');
const NONCE = getNonce();

module.exports = {

  entry: './client/index.js',
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader'},
      { test: /\.(scss|css)$/, use: [
        {
          loader: 'style-loader',
          options: {
            attributes: {
              nonce: NONCE
            }
          }
        }, 
          'css-loader', 'sass-loader']},
      { test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new Dotenv()
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'

};