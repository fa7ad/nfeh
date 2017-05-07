const path = require('path')
const Webpack = require('webpack')
const cssnano = require('cssnano')
const { uniq, concat } = require('lodash')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = (process.env.NODE_ENV === 'production')

const pluginsList = [
  new ExtractTextPlugin('css/styles.css'),
  new Webpack.NoEmitOnErrorsPlugin()
]

const prodPlugins = [
  new Webpack.optimize.DedupePlugin(),
  new Webpack.optimize.OccurrenceOrderPlugin(true),
  new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  })
]

module.exports = {
  target: 'electron',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve('.'),
    filename: 'js/main.js'
  },
  devtool: isProduction ? null : 'cheap-module-sourcemap',
  resolve: {
    extensions: ['.js', '.jsx', '.sass']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s.ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [cssnano]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [cssnano]
              }
            }
          ]
        })
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'lodash': '_'
  },
  plugins: uniq(isProduction ? concat(prodPlugins, pluginsList) : pluginsList)
}
