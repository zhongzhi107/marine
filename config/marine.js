'use strict';

module.exports = {
  port:  {
    www: 9002,
    liveReload: 35733
  },

  path: {
    // app src
    app: 'src',
    // dist
    dist: 'dist'
  },

  // 访问不同环境对应的qzz域名
  cdnDomain: {
    dev: 'http://localhost:9002',
    beta: 'http://localhost:9002/xx/prd/',
    prod: 'http://localhost:9002/xx/prd/'
  },
};
