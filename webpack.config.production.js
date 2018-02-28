const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const packageJSON = require('./package.json');

module.exports = {
  // set mode for 'production'
  mode: 'production',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'source-map',
  entry: {
    a: './src/a/index.js',
    b: './src/b/index.js'
  },
  output: {
    filename: `${packageJSON.version}/js/[name].[chunkhash:8].js`,
    path: path.resolve(__dirname, '_output')
  },
  optimization: {
      splitChunks: {
        minSize: 0,
        chunks: 'all'
      },
      runtimeChunk: true
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
      excludeChunks: ['b', 'runtime~b'],
      minify: {
        removeComments: true,
        removeScriptTypeAttributes: true,
      }
    }),
    new HtmlWebpackPlugin({
      title: 'page b',
      inject: true,
      template: 'public/index.html',
      filename: 'page-b.html',
      excludeChunks: ['a', 'runtime~a', 'vendors~a'],
      minify: {
        removeComments: true,
        removeScriptTypeAttributes: true,
      }
    }),
    new ExtractTextPlugin(`${packageJSON.version}/css/[name].[contenthash:8].css`),
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
};