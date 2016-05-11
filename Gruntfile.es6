'use strict';

import matchdep from 'matchdep';
import connect from './config/grunt/connect';
import webpackConfig from './config/grunt/webpack-production';

export default (grunt) => {
  matchdep.filterAll('grunt-*').forEach((nodeModule) => {
    grunt.loadNpmTasks(nodeModule);
  });

  grunt.initConfig({
    // 本地web服务器
    connect: connect,

    webpack: {
      build: webpackConfig
    }
  });

  // 注册默认任务
  grunt.registerTask('default', () => {
    console.log([
      'Marine Commands Manual',
      '',
      '可用命令:',
      'npm start\t\t启动开发环境服务',
      'npm run start:dist\t启动编译结果预览服务',
      'npm run build\t\t编译项目',
      '',
      'The following options are available:',
      '--host\t\t服务器域名，默认localhost',
      '--port\t\t服务器端口号，默认3000',
      '--deploy-type\t编译类型'
    ].join('\n'));
  });

  grunt.registerTask('serve', (target='dev') => {
    let tasks = ['configureRewriteRules'];
    if (target !== 'dev') {
      tasks.push('build');
    }
    tasks.push(`connect:${target}`);
    grunt.task.run(tasks);
  });

  grunt.registerTask('build', [
    'webpack'
  ])

};
