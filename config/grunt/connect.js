'use strict';

import grunt from 'grunt';
import webpack from 'webpack';
import webpackConfig from './webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import marine from '../marine';
import routerApi from '../router-api';
import {rewriteRequest} from 'grunt-connect-route/lib/utils';
import serverRender from '../../serverRender';

let compiler = webpack(webpackConfig);

let mountFolder = (connect, dir) => {
  return connect.static(require('path').resolve(dir));
};

export default {
  rules: routerApi,
  dev: {
    options: {
      port: grunt.option('port') || marine.port.www,
      hostname: '0.0.0.0',
      localhost: grunt.option('host') || 'localhost',
      keepalive: true,
      // livereload: ma.port.liveReload,
      middleware: (connect) => {
        return [
          serverRender,
          mountFolder(connect, marine.path.app + '/public'),
          rewriteRequest,
          webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {
              colors: true,
              noInfo: false,
            }
          }),
          webpackHotMiddleware(compiler)
        ];
      }
    }
  },
  dist: {
    options: {
      port: grunt.option('port') || marine.port.www,
      hostname: '0.0.0.0',
      localhost: grunt.option('host') || 'localhost',
      keepalive: true,
      middleware: (connect) => {
        return [
          mountFolder(connect, marine.path.dist),
          mountFolder(connect, marine.path.dist + '/views'),
          rewriteRequest
        ];
      }
    }
  }
};
