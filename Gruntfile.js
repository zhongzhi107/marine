'use strict';

var LIVERELOAD_PORT = 35733;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var ma = require('./config/marine').path;

    var webpack = require('webpack');
    var webpackConfig = require('./config/webpack');

    grunt.initConfig({
        ma: ma,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%=ma.dist%>/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        copy: {
            html: {
                expand: true,
                cwd: '<%=ma.src%>',
                dest: '<%=ma.dist%>',
                src: '**/*.html'
            }
        },

        connect: {
            //rules: require('./config/router-api'),
            dev: {
                options: {
                    port: grunt.option('port') || 9002,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: '0.0.0.0',
                    //localhost: 'my.qunar.com',
                    localhost: grunt.option('host') || 'localhost',
                    //keepalive: true,
                    //open: true,
                    //debug: true,
                    livereload: LIVERELOAD_PORT,
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')({port: LIVERELOAD_PORT}),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, ma.app),
                            // mountFolder(connect, ma.app + '/components/pages'),
                            require('./config/serverRender')
                            //rewriteRulesSnippet,
                            //velocityParser
                        ];
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            html: {
                files: [
                    'app/index.html'
                ]
            },
            js: {
                files: [
                    'app/**/*.js'
                ],
                tasks: [
                    'webpack'
                ]
            },
            css: {
              files: ['app/css/*.{css,less}'],
              tasks: [
                  'webpack'
              ]
            }
        },

        webpack: {
            options: webpackConfig,
            dist: {
              plugins: webpackConfig.plugins.concat(
                // new webpack.DefinePlugin({
                //   "process.env": {
                //     // This has effect on the react lib size
                //     "NODE_ENV": JSON.stringify("production")
                //   }
                // }),
                // new webpack.optimize.DedupePlugin(),
                // new webpack.optimize.UglifyJsPlugin()
              )
            }
        }
    });

    //grunt.loadNpmTasks('grunt-webpack');
    //grunt.loadNpmTasks('webpack-dev-server');
    grunt.registerTask('default', [
        'clean:server',
        'webpack',
        'connect',
        'watch'
    ]);

    grunt.registerTask('server', [
        'default'
    ]);
};
