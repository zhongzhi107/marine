import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import format from 'string-format';
import '../utils/require-polyfill';
import routes from '../main';

const META_KEYS = ['title', 'keywords', 'description', 'body'];

function render(data, res, renderProps, meta, templateString) {
  renderProps.params.observe = data;
  meta.pageInitialState = JSON.stringify(data);
  // TODO 用data做二次替换
  meta.body = renderToString(<RouterContext {...renderProps} />);
  res.end(format(templateString, meta));
}

export default (options) => {
  return (req, res, next) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log('500');
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        console.log('302');
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.

        let filename = path.join(process.cwd(), options.layoutPath);
        let templateString = fs.readFileSync(filename, { encoding: 'utf8' });
        let meta = {
          pageInitialState: ''
        };
        // 初始化meta数据
        META_KEYS.forEach((key) => {
          meta[key] = '';
        });

        // 取最下层的组件作为目标组件
        let {components, params} = renderProps;
        let Component = components[components.length - 1];
        if (Component) {
          // 将Component的静态属性赋给meta
          META_KEYS.forEach((key) => {
            if (Component.hasOwnProperty(key)) {
              meta[key] = format(Component[key], params);
            }
          });

          if (Component.observe) {
            try {
              Component
                .observe()
                .then((data) => {
                  render(data, res, renderProps, meta, templateString);
                }, (reason) => {
                  render(Component.defaultState, res, renderProps, meta, templateString);
                })
                .catch(() => {
                  // 接口出现问题
                  render(Component.defaultState, res, renderProps, meta, templateString);
                });
            } catch (e) {
              render(Component.defaultState, res, renderProps, meta, templateString);
            }

          } else {
            render(Component.defaultState, res, renderProps, meta, templateString);
          }
        } else {
          console.log('Component not found');
        }

      } else {
        next();
      }
    });
  };
};
