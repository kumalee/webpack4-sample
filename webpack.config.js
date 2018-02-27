const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    head: './src/head.js', 
    index: './src/index.js', 
    a: './src/a/index.js', 
    b: './src/b/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'page a',
      inject: true,
      template: 'public/index.html',
      filename: 'page-a.html',
      chunks: ['head', 'index', 'a']
    }),
    new HtmlWebpackPlugin({
      title: 'page b',
      inject: true,
      template: 'public/index.html',
      filename: 'page-b.html',
      chunks: ['head', 'index', 'b']
    }),
  ]
};