'use strict';

export default {
  html: {
    expand: true,
    cwd: '<%=ma.path.app%>/components/pages',
    dest: '<%=ma.path.dist%>',
    src: '**/*.html'
  },

  mainjs: {
    dest: '<%=ma.path.dist%>/js/main.js',
    src: '.tmp/js/main.js'
  },

  css: {
    expand: true,
    cwd: '<%=ma.path.app%>/css',
    dest: '<%=ma.path.dist%>/css',
    src: ['{pure-min,base}.css', 'fonts/*.ttf']
  }
};
