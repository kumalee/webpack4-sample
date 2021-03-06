const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // set mode for 'development'
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  entry: {
    hot: require.resolve('react-dev-utils/webpackHotDevClient'),
    a: './src/a/index.js',
    b: './src/b/index.js'
  },
  output: {
    filename: 'latest/js/[name].js',
    path: path.resolve(__dirname, '_output')
  },
  module:{
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loaders:[
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: './_output',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'page a',
      inject: true,
      template: 'public/index.html',
      filename: 'page-a.html',
      chunks: ['hot', 'a']
    }),
    new HtmlWebpackPlugin({
      title: 'page b',
      inject: true,
      template: 'public/index.html',
      filename: 'page-b.html',
      chunks: ['hot', 'b']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};