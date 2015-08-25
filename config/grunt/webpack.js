'use strict';

import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const AUTOPREFIXER_LOADER = '!autoprefixer?{browsers:[' +
'"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
'"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

export default {
  cache: false,
  entry: './src/main.js',
  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/js',
  },
  module: {
    loaders: [
      // { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader' + AUTOPREFIXER_LOADER, 'less-loader') },
      { test: /\.css$/, loader: 'style!css?minimize' },
      { test: /\.less$/, loader: 'style!css' + AUTOPREFIXER_LOADER + '!less' },
      // { test: /\.gif/, loader: 'url?limit=8192&minetype=image/gif' },
      // { test: /\.jpg/, loader: 'url?limit=8192&minetype=image/jpg' },
      // { test: /\.png/, loader: 'url?limit=8192&minetype=image/png' },
      // { test: /\.jsx?$/, loader: 'jsx?harmony&stripTypes' }
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
