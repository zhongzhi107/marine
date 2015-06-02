'use strict';

module.exports = {
  options: {
    livereload: require('../marine').port.liveReload
  },
  html: {
    files: [
      'src/index.html'
    ]
  },
  js: {
    files: [
      'src/**/*.{js,css}'
    ],
    options: {
      //TODO: 暂时整页刷新
      reload: true
    }

  // },
  // css: {
  //   files: ['app/css/*.{css,less}'],
  //   tasks: [
  //     'webpack'
  //   ]
  }
};
