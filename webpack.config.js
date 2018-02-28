const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    a: './src/a/index.js',
    b: './src/b/index.js'
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      chunks: 'all'
    },
    runtimeChunk: true
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'page a',
      inject: true,
      template: 'public/index.html',
      filename: 'page-a.html',
      excludeChunks: ['b', 'runtime~b']
    }),
    new HtmlWebpackPlugin({
      title: 'page b',
      inject: true,
      template: 'public/index.html',
      filename: 'page-b.html',
      excludeChunks: ['a', 'runtime~a', 'vendors~a']
    }),
    new ExtractTextPlugin("[name].[contenthash:8].css"),
  ]
};