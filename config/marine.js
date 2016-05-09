'use strict';

/**
 * 服务器端渲染和浏览器端渲染走的不同逻辑
 * 解决打包时只打包对应环境的配置，避免将dev/beta的配置带到线上
 *
 *  1.服务器端渲染时引用env/index，将所有的环境配置都导入
 *    根据NODE_ENV设置为当前环境所需要的配置
 *  2.浏览器端，通过webpack.config.module.resolve.alias，
 *    将包设置成NODE_ENV对应的module
 *
 */
let profile = require('./env/index');
if (!process.browser) {
  profile = profile[process.env.NODE_ENV];
}

// 设置通用配置，会被所在环境配置覆盖
let common = {
  port:  {
    www: 3000,
    liveReload: 35734
  },

  path: {
    // app src
    app: 'src',
    // dist
    dist: 'prd'
  },

  assetsType: [
    'js',
    'css',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'ttf',
    'eot',
    'otf',
    'svg',
    'woff',
    'woff2',
    'mp3',
    'swf',
    'ico'
  ],

};

export default Object.assign({}, common, profile);
