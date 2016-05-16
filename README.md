# Marine
Marine is a small isomorphic web application framework.

It is built on koa using React and Redux. It is developed with webpack and react-hot-loader and written with babeljs with the help of eslint.

单页面应用(SPA)的用户体验相比传统网站来说要好很多，但是，它对SEO很不友好。

React的`server render`能解决大部分SEO的问题，但是，有时我们希望网页初始化的Ajax数据也变成搜索引擎能爬到的内容。

本项目的主要目的就是解决以上2个问题。

## 关键词
* react
* webpack
* isomorphic
* universal
* babeljs
* es6
* gruntjs
* eslint

## TODO LIST
- [ ]整理package.json，区分dependencies和devDependencies
- [ ]增加注释文档
- [ ]区分history.back和首次进入
- [ ]前端props预加载完成后再进入目标页面
- [ ]模拟进度条
- [ ]测试用例
- [x]Component错误在服务器端渲染时不报错
- [x]build，将版本号替换到html中
- [ ]增加404页面
- [ ]webserver升级为koa
- [ ]测试在windows系统下的兼容性
- [ ]grunt-connect-route@0.3.3安装不了
- [ ]redux文件修改后不能hmr
- [ ]css in js
  - [ ]PostCSS
  - [ ]Server render https://github.com/Khan/aphrodite
  - [ ]Nesting Styles https://github.com/dowjones/react-inline-style
  - [ ]React Native style

## 安装

```shell
# 安装依赖包
npm install --registry=https://registry.npm.taobao.org

# 启动调试模式
npm start

# 浏览器中浏览网页
http://localhost:3000
```

## 目录结构

```
.
├── /config/                    # 项目配置文件目录
│   ├── /env/                   # 环境差异配置文件
│   │   ├── /development.js     # Dev环境配置文件
│   │   └── /production.js      # 生产环境配置文件
│   ├── /grunt/                 # Grunt任务配置文件
│   ├── /marine.js              # 项目综合配置文件
│   └── /router-api.js          # APIs接口mock路由配置文件
├── /dist/                      # 项目编译输出目录
├── /docs/                      # 文档
├── /src/                       # 项目源码目录
│   ├── /components/            # React组件
│   ├── /data/                  # Mock数据文件
│   ├── /decorators/            # 装饰器
│   ├── /middlewares/           # 中间件
│   ├── /public/                # 静态资源目录
│   ├── /routes/                # 路由配置
│   ├── /utils/                 # Utility classes and functions
│   └── /main.js                # startup script
│── .babelrc                    # babel配置
│── .editorconfig               # 代码编辑器配置
│── .eslintrc                   # eslint配置
│── Gruntfile.es6               # 用ES6编写的Grunt主配置
│── Gruntfile.js                # Grunt入口
│── package.json
└── README.md                   
```

## 浏览器支持
支持history management的浏览器
IE11+，Chrome，Firefox

## 代码规范

### CSS
* http://cssguidelin.es/

### JavaScript
* https://github.com/airbnb/javascript
* http://jscs.info/

### JSON
* https://github.com/darcyliu/google-styleguide/blob/master/JSONStyleGuide.md

### React
* https://github.com/zhongzhi107/react-style-guide

### git
* https://github.com/aseaday/git-style-guide
