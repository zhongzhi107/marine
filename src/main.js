'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { browserHistory as history, Router, match } from 'react-router';
import { Provider } from 'react-redux';
import reducer from './redux';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { ReduxAsyncConnect } from 'redux-async-connect';
// import routes from './routes';

// console.log(createStore(reducer));

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
      callback(null, require('./containers/App/App'))
    })
  }
};

const store = createStore(reducer);

if (!module.parent) {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(
      <Provider store={store} key="provider">
        <Router {...renderProps} />
      </Provider>,
      document.getElementById('app')
    );
  });
}

// if (module.hot) {
//   module.hot.accept('./redux', () => {
//     store.replaceReducer(require('./redux'));
//   });
// }

export default routes;
// render(
//   <Router
//     history={browserHistory}
//     routes={routes}
//   />,
//   document.getElementById('app')
// );
