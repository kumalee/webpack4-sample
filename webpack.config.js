const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    a: './src/a/index.js', 
    b: './src/b/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'page a',
      inject: true,
      template: 'public/index.html',
      filename: 'page-a.html',
      chunks: ['a']
    }),
    new HtmlWebpackPlugin({
      title: 'page b',
      inject: true,
      template: 'public/index.html',
      filename: 'page-b.html',
      chunks: ['b']
    }),
  ]
};