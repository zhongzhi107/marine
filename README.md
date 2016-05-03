# Marine
单页面应用(SPA)的用户体验相比传统网站来说要好很多，但是，它对SEO很不友好。

React的`server render`能解决大部分SEO的问题，但是，有时我们希望网页初始化的Ajax数据也变成搜索引擎能爬到的内容。

本项目的主要目的就是解决以上2个问题。

## 关键词
* react
* webpack
* babeljs
* es6
* gruntjs
* semantic-ui
* eslint

## 安装

```shell
$ npm install --registry=https://registry.npm.taobao.org
$ npm start
$ open http://localhost:3000
```

## 目录结构

```
.
├── /config/                    # 项目配置文件目录
│   ├── /env/                   # 环境差异配置文件
│   │   ├── /beta.js            # Beta环境配置文件
│   │   ├── /development.js     # DEV环境配置文件
│   │   └── /production.js      # 生产环境配置文件
│   ├── /grunt/                 # Grunt任务配置文件
│   ├── /marine.js              # 项目综合配置文件
│   └── /router-api.js          # APIs接口mock路由配置文件
├── /docs/                      # 文档
├── /node_modules/              # 依赖包
├── /prd/                       # 项目编译输出目录
├── /src/                       # 项目源码目录
│   ├── /components/            # React组件
│   ├── /data/                  # Mock数据文件
│   ├── /public/                # 静态资源目录
│   ├── /utils/                 # Utility classes and functions
│   └── /main.js                # startup script
│── .babelrc                    # babel配置
│── .editorconfig               # 代码编辑器配置
│── .eslintrc                   # eslint配置
│── Gruntfile.es6               # 用ES6编写的Grunt主配置
│── Gruntfile.js                # Grunt入口
│── package.json
│── pom.xml                     # 与后端关联的Maven配置
└── README.md                   
```

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

#### 分支名称
* yyyymmdd_keyword_pmo项目编号
* 使用下划线链接
* keyword全部小写，不要太长，能大概标识当前分支的修改即可
* 项目如果需要同时修改前后端项目，尽量使用相同的名称
* 好的名称，如 20140124_searchinput_WAPHOTEL-3976， 20131227_safestring_DZW-123
* 不好的名称，如 20140124_search_input， 20140124_searchInput
