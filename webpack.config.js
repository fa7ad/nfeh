const Webpack = require('webpack')
const cssnano = require('cssnano')
const { uniq, concat } = require('lodash')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = (process.env.NODE_ENV === 'production')

const pluginsList = [
  new ExtractTextPlugin('css/styles.css'),
  new Webpack.NoErrorsPlugin()
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
  noInfo: true,
  target: 'electron',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: './',
    filename: 'js/main.js'
  },
  devtool: isProduction ? null : 'cheap-module-sourcemap',
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass']
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
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName="[name]-[local]-[hash:9]"' +
          '&importLoaders=1!postcss!sass'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },
  postcss: () => [cssnano],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'lodash': '_'
  },
  plugins: uniq(isProduction ? concat(prodPlugins, pluginsList) : pluginsList)
}
