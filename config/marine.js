'use strict';

let profile;

/* eslint-disable */
try {
  /**
   * __LOCAL__,__DEV__,__BETA__,__PROD__在webpack中定义
   * todo 代码比较恶心，且和webpack配置耦合紧密
   * webpack2的条件包含比较搓，很不智能
   * if条件只支持布尔值(true/false/1/0)，不支持表达式
   * 无论表达式的结果如何，都会当做true处理
   *
   * 例如：
   * // 编译结果不包含marine
   * if (false) {require('marine')}
   *
   * // 编译结果包含marine
   * if (true) {require('marine')}
   *
   * // 编译结果包含marine
   * if (1!=2) {require('marine')}
   */
  if (__LOCAL__) {
    profile = require('./env/local');
  }
  if (__DEV__) {
    profile = require('./env/development');
  }
  if (__BETA__) {
    profile = require('./env/beta');
  }
  if (__PROD__) {
    profile = require('./env/production');
  }
} catch (e) {
  // 服务器端渲染时会走这个分支
  let serverOnlyPath = './env/' + process.env.NODE_ENV;
  /**
   * 此处webpack会报错，但nodejs执行不报错
   * 正是利用这个特点，实现服务器端包含，webpack打包时不包含
   *
   * // 如果写成下面这种形式，webpack会把env目录下的所有文件都打包进来
   * require('./env' + process.env.NODE_ENV);
   * 
   * @TODO 消除webpack报错
   */
  profile = require(serverOnlyPath);
}
/* eslint-enable */

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
