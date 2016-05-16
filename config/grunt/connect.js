'use strict';

import grunt from 'grunt';
import webpack from 'webpack';
import webpackConfig from './webpack-development';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import marine from '../marine';
import routerApi from '../router-api';
import {rewriteRequest} from 'grunt-connect-route/lib/utils';
// import serverRender from '../../src/middlewares/serverRender';

let compiler = webpack(webpackConfig);

let mountFolder = (connect, dir) => {
  return connect.static(require('path').resolve(dir));
};

export default {
  rules: routerApi,
  options: {
    hostname: '0.0.0.0',
    keepalive: true,
    port: grunt.option('port') || marine.port.www,
    localhost: grunt.option('host') || 'localhost',
  },
  dev: {
    options: {
      middleware: (connect) => {
        return [
          // serverRender({ layoutPath: marine.path.app + '/public/index.html'}),
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
      middleware: (connect) => {
        return [
          serverRender({
            layoutPath: 'dist/index.html',
          }),
          mountFolder(connect, marine.path.dist),
          rewriteRequest
        ];
      }
    }
  }
};
