'use strict';

import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import marine from '../marine';

// 是否为debug模式
const DEBUG = process.env.NODE_ENV === 'local';

// css是否需要代码压缩
const minimize = DEBUG ? '' : '?minimize';

// autoprefixer兼容的浏览器列表
const AUTOPREFIXER_LOADER = '!autoprefixer?' + JSON.stringify({
  browsers: [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24',
    'Explorer >= 8',
    'iOS >= 6',
    'Safari >= 6'
  ]
});

const STYLE_LOADER = 'style!css' + minimize + AUTOPREFIXER_LOADER;

// webpack插件
let plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }),
  // new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

if (!DEBUG){
  plugins.push(
    new CleanWebpackPlugin(['.tmp', marine.path.dist], {
      root: process.cwd()
    }),
    new CopyWebpackPlugin([
      {
        from: `${marine.path.app}/public/**/*`,
        to: marine.path.dist,
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        'drop_debugger': true,
        'drop_console': true
      }
    })
  );
}

export default {
  cache: false,
  entry: [
    'webpack-hot-middleware/client',//?path=/__webpack_hmr&timeout=20000',
    `./${marine.path.app}/main.js`
  ],
  output: {
    // chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',//outputFilename,
    path: path.join(process.cwd(), marine.path.dist, 'js'),
    publicPath: '/js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      { test: /\.css$/, loader: STYLE_LOADER },
      { test: /\.less$/, loader: STYLE_LOADER + '!less' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          // 注意插件的顺序
          // 浏览器端渲染时，装饰器插件一定要在私有属性插件前面，这个顺序和服务器端渲染有冲突
          // todo 等官方decorator插件出来后，和.babelrc的配置统一
          plugins: [
            'babel-plugin-transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      './config/env/index': './env/' + process.env.NODE_ENV
    },
    // 设置webpack体系下require默认目录
    modulesDirectories: [
      `${marine.path.app}`,
      'node_modules'
    ],
    // 设置webpack体系下require默认文件类型
    extensions: ['', '.json', '.js']
  },
  plugins: plugins
};
