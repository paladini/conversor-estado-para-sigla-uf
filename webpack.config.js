const {join} = require('path');
const camelCase = require('lodash.camelcase');
const webpack = require('webpack');

const package = require('./package.json');

module.exports = {
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
  externals: {
    'fuse.js': {
      commonjs: 'fuse.js',
      commonjs2: 'fuse.js',
      amd: 'fuse.js',
      root: 'Fuse',
    },
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
