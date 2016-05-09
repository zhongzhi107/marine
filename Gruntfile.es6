'use strict';

import path from 'path';
import timeGrunt from 'time-grunt';
import connect from './config/grunt/connect';

export default (grunt) => {

  // node-modules是提供给QDR编译环境使用的参数
  // 本机开发可以忽略
  let nodeModulesDir = grunt.option('node-modules') || '.';
  let root = path.resolve('node_modules');

  require('matchdep').filterAll('grunt-*').forEach((nodeModule) => {
    let taskdir = path.join(root, nodeModule, 'tasks');
    if (grunt.file.exists(taskdir)) {
      // 优先从项目根目录下加载依赖包
      grunt.loadNpmTasks(nodeModule);
    } else if (nodeModulesDir) {
      // 项目根目录没找到的话就到外部公共目录找
      let cwd = process.cwd();
      process.chdir(nodeModulesDir);
      grunt.loadNpmTasks(nodeModule);
      process.chdir(cwd);
    }
  });

  // 各模块运行所消耗的时间，可以用来指导优化编译过程
  timeGrunt(grunt);

  grunt.initConfig({
    // 项目配置
    // ma: ma,

    // 本地web服务器
    connect: connect,

  });

  // 注册默认任务
  grunt.registerTask('default', [
    'configureRewriteRules',
    'connect:dev'
  ]);

};
