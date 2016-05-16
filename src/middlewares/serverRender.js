import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import format from 'string-format';
import '../utils/require-polyfill';
import '../utils/require-css';
import '../utils/require-react-css-modules';
import routes from '../main';

const META_KEYS = ['title', 'keywords', 'description', 'body'];

function render(data, res, renderProps, meta, templateString) {
  renderProps.params.observe = data;
  meta.pageInitialState = JSON.stringify(data);
  // TODO 用data做二次替换
  try {
    meta.body = renderToString(<RouterContext {...renderProps} />);
  } catch(e) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end(e.message);
  }
  res.end(format(templateString, meta));
}

export default (options) => {
  return (req, res, next) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log('500');
        res.writeHead(500);
        res.end(error.message);
      } else if (redirectLocation) {
        let newUrl = redirectLocation.pathname + redirectLocation.search;
        res.writeHead(302, {Location: newUrl});
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.

        // loadOnServer({...renderProps, store}).then(() => {
        //   console.log('======', store);
          // const component = (
          //   <Provider store={store} key="provider">
          //     <ReduxAsyncConnect {...renderProps} />
          //   </Provider>
          // );

          // res.status(200);
          // renderToString(<RouterContext {...renderProps} />);
          // render(store, res, renderProps, meta, templateString);

          // global.navigator = {userAgent: req.headers['user-agent']};
          //
          // res.send('<!doctype html>\n' +
          //   ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
        // });



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
