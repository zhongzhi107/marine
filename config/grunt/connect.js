'use strict';

module.exports = function() {
  var grunt = require('grunt');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');

  var ma = require('../marine');
  var rewriteRulesSnippet = require('grunt-connect-route/lib/utils').rewriteRequest;
  var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  return {
    rules: require('../router-api'),
    dev: {
      options: {
        port: grunt.option('port') || ma.port.www,
        hostname: '0.0.0.0',
        localhost: grunt.option('host') || 'localhost',
        livereload: ma.port.liveReload,
        middleware: function(connect) {
          return [
            // mountFolder(connect, '.tmp'),
            // mountFolder(connect, ma.path.app),
            mountFolder(connect, ma.path.app + '/assets'),
            require('../../src/server'),
            rewriteRulesSnippet,
            webpackDevMiddleware(webpack(webpackConfig), {
              publicPath: '/js',
              //watchDelay: 5000,
              //contentBase: '.tmp',
              //inline: true,
              // hot: true,
              stats: {colors: true}
            }),
            // require('../../src/server')
          ];
        }
      }
    },
    dist: {
      options: {
        port: grunt.option('port') || ma.port.www || 9000,
        hostname: '0.0.0.0',
        localhost: grunt.option('host') || 'localhost',
        keepalive: true,
        middleware: function(connect) {
          return [
            mountFolder(connect, ma.path.dist),
            rewriteRulesSnippet,
            require('../serverRender')
          ];
        }
      }
    }
  };
};
