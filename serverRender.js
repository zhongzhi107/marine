import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import template from 'lodash.template';
import routes from './src/routes';

const META_KEYS = ['title', 'keywords', 'description', 'body'];

export default (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.

      let filename = __dirname + '/src/public/index.html';
      let templateString = fs.readFileSync(filename, { encoding: 'utf8' });
      let meta = {
        pageInitialState: ''
      };
      // 初始化meta数据
      META_KEYS.forEach((key) => {
        meta[key] = '';
      });

      // 取最下层的组件作为目标组件
      let Component = renderProps.components[renderProps.components.length - 1];
      if (Component) {
        // 将Component的静态属性赋给meta
        META_KEYS.forEach((key) => {
          if (Component.hasOwnProperty(key)) {
            meta[key] = template(Component[key])(renderProps.params);
          }
        });

        if (Component.observe) {
          Component
            .observe()
            .then((data) => {
              renderProps.params.observe = data;
              meta.pageInitialState = JSON.stringify(data);
              // TODO 用data做二次替换
              meta.body = renderToString(<RouterContext {...renderProps} />);
              res.end(template(templateString)(meta));
            })
            .catch(() => {
              // 接口出现问题
              meta.body = renderToString(<RouterContext {...renderProps} />);
              res.end(template(templateString)(meta));
            });
        } else {
          meta.body = renderToString(<RouterContext {...renderProps} />);
          res.end(template(templateString)(meta));
        }
      } else {
        console.log('Component not found');
      }

    } else {
      next();
    }
  })
}
