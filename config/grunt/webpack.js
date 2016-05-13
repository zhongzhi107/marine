'use strict';

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplaceHashWebpackPlugin from 'replace-hash-webpack-plugin';
import precss from 'precss';
import cssnext from 'postcss-cssnext';
// import AssetsWebpackPlugin from 'assets-webpack-plugin';
import marine from '../marine';

const cwd = process.cwd();
const app = marine.path.app;
const dist = marine.path.dist;
const nodeModuleReg = /node_modules/;

/**
 * options:
 * options.hot
 * options.release
 * options.longTermCaching
 * options.minimize
 * options.
 */
export default (options) => {

  let entry = [
    `./${app}/main.js`
  ];

  let output = {
    // 使用code-splitting打出的chunk包文件名
    chunkFilename: '[name]' + (options.longTermCaching ? '.[chunkhash]' : '') + '.js',
    // 入口文件打包后的文件名
    filename: '[name]' + (options.longTermCaching ? '.[hash]' : '') + '.js',
    // 编译产出物输出路径
    path: path.join(cwd, dist, 'js'),
    // dev-server模式下动态文件输出路径
    publicPath: '/js/',
  };

  // webpack插件
  let plugins = [
    new CleanWebpackPlugin(dist, {root: cwd}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      BROWSER: JSON.stringify(true),
    }),
    new webpack.NoErrorsPlugin(),
  ];

  let resolve = {
    alias: {
      './config/env/index': './env/' + process.env.NODE_ENV
    },
  };

  let postcss = () => {
    return [
      precss,
      cssnext
    ];
  }

  let moduleConfig = {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: nodeModuleReg
      }
    ],
    loaders: [
      { test: /\.css$/, loader: 'style!css!postcss' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: nodeModuleReg,
        query: {
          // 注意插件的顺序
          // 浏览器端渲染时，装饰器插件一定要在私有属性插件前面，这个顺序和服务器端渲染有冲突
          // todo 等官方decorator插件出来后，和.babelrc的配置统一
          plugins: [
            'babel-plugin-transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      },
    ]
  };

  if (options.hot) {
    entry.push('webpack-hot-middleware/client');
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    moduleConfig.loaders.unshift({
      test: /\.js$/,
      loader: 'react-hot',
      exclude: nodeModuleReg
    });
  }

  if (options.release) {
    plugins.push(
      new webpack.BannerPlugin({
        banner: fs.readFileSync(path.join(cwd, 'LICENSE'), { encoding: 'utf8' }),
        entryOnly: true
      }),
      new CopyWebpackPlugin([{
        context: `${app}/public`,
        from: '**/*',
        to: path.join(cwd, dist),
      }]),
      new ReplaceHashWebpackPlugin({
        src: `${app}/public/index.html`,
        dest: `${dist}/index.html`,
      }),
    );
  }

  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          'drop_debugger': true,
          'drop_console': true
        }
      })
    );
  }


  return {
    entry,
    output,
    plugins,
    resolve,
    postcss,
    module: moduleConfig,
  };

};
