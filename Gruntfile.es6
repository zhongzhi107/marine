'use strict';

import loadGruntTasks from 'load-grunt-tasks';
import timeGrunt from 'time-grunt';
import webpackConfig from './config/grunt/webpack';
import ma from './config/marine';

export default (grunt) => {
  loadGruntTasks(grunt);
  timeGrunt(grunt);

  grunt.initConfig({
    // 项目配置
    ma: ma,

    // 清除文件/目录
    clean: require('./config/grunt/clean'),

    // 复制文件/目录
    copy: require('./config/grunt/copy'),

    // 本地web服务器
    connect: require('./config/grunt/connect'),

    watch: require('./config/grunt/watch'),

    webpack: {
      options: webpackConfig,
      dist: {
        plugins: webpackConfig.plugins.concat(
          // new webpack.DefinePlugin({
          //   "process.env": {
          //     // This has effect on the react lib size
          //     "NODE_ENV": JSON.stringify("production")
          //   }
          // }),
          // new webpack.optimize.DedupePlugin(),
          // new webpack.optimize.UglifyJsPlugin()
        )
      }
    }
  });

  grunt.registerTask('default', [
    'clean:server',
    // 'webpack',
    'configureRewriteRules',
    'connect:dev',
    'watch'
  ]);
};
