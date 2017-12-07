const {join} = require('path');
const camelCase = require('lodash.camelcase');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const package = require('./package.json');
const {PORT=3030, NODE_ENV='production'} = process.env;


const base = {
  entry: {
    index: join(__dirname, 'src')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: camelCase(package.name.split('/').slice(-1)[0]),
    libraryTarget: 'umd',
    path: join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [join(__dirname, 'node_modules')]
      }
    ]
  },
};


const env = {
  development: {
    devtool: 'source-map',
    devServer: {
      hot: true,
      inline: true,
      historyApiFallback: true,
      port: PORT,
      publicPath: '/',
      contentBase: join(__dirname, '.'),
      watchContentBase: true,
      stats: {
        colors: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: join(__dirname, 'index.html'),
        inject: 'head',
      })
    ]
  },

  production: {
    externals: {
      'fuse.js': {
        commonjs: 'fuse.js',
        commonjs2: 'fuse.js',
        amd: 'fuse.js',
        root: 'Fuse',
      },
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
    ]
  }
};


module.exports = Object.assign({}, base, env[NODE_ENV]);
