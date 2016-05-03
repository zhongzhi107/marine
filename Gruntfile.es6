'use strict';

import path from 'path';

import ma from './config/marine';
import timeGrunt from 'time-grunt';
import clean from './config/grunt/clean';
import copy from './config/grunt/copy';
import connect from './config/grunt/connect';
import eslint from './config/grunt/eslint';
import htmlmin from './config/grunt/htmlmin';
import rev from './config/grunt/rev';
import useminPrepare from './config/grunt/usemin-prepare';
import usemin from './config/grunt/usemin';
import watch from './config/grunt/watch';
import webpack from './config/grunt/webpack';

module.exports = function(grunt) {

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
    ma: ma,

    // 清除文件/目录
    clean: clean,

    // 复制文件/目录
    copy: copy,

    // 本地web服务器
    connect: connect,

    // eslint
    eslint: eslint,

    // 压缩html
    htmlmin: htmlmin,

    // 文件md5
    rev: rev,

    // usemin预处理程序
    useminPrepare: useminPrepare,

    // 文件concat、cdn替换等操作
    usemin: usemin,

    // 监听文件变化
    watch: watch,

    // webpack
    webpack: webpack,

  });

  // 注册默认任务
  grunt.registerTask('default', ['build']);

  // 注册本地开发环境任务
  grunt.registerTask('serve', (target) => {
    const DEV = 'dev';
    target = target || DEV;
    let taskList = [`clean:${target}`, 'eslint'];
    if (target !== DEV) {
      taskList.push('build');
    }
    taskList.push('configureRewriteRules', `connect:${target}`);
    if (target === DEV) {
      taskList.push('watch');
    }
    grunt.task.run(taskList);
  });

  // 注册index.html移动位置任务
  grunt.registerTask('fixPath', () => {
    let filename = 'index.html';
    let srcPath = path.join(ma.path.dist, filename);
    let destPath = path.join(ma.path.dist, 'views', filename);
    grunt.file.copy(srcPath, destPath);
    grunt.file.delete(srcPath);
    grunt.log.write('Move file: ' + srcPath + ' -> ' + destPath);
  });

  // 注册编译任务
  grunt.registerTask('build', [
    'clean:dist',
    'eslint',
    'copy',
    'webpack',
    'useminPrepare',
    'rev',
    'usemin',
    'htmlmin',
    'fixPath'
  ]);
};
