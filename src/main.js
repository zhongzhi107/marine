'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory as history, Router, match } from 'react-router';
// import routes from './routes';

const routes = {
  path: '/',

  getChildRoutes(location, callback) {
    require.ensure([], (require) => {
      callback(null, [
        require('./routes/about'),
        require('./routes/user'),
      ])
    })
  },

  getIndexRoute(location, callback) {
    require.ensure([], (require) => {
      callback(null, {
        component: require('./components/Home'),
      })
    });

  },

  getComponents(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./components/App'))
    })
  }
}

if (!module.parent) {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(
      <Router {...renderProps} />,
      document.getElementById('app')
    );
  });
}

export default routes;
// render(
//   <Router
//     history={browserHistory}
//     routes={routes}
//   />,
//   document.getElementById('app')
// );
