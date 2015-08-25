import 'babel/polyfill';
import url from 'url';
import fs from 'fs';
import _ from 'lodash';
import React from 'react';
import App from './components/App';
import router from './router-component';

function readTemplateString() {
  let filename = __dirname + '/templates/layout/default.html';
  return _.template(fs.readFileSync(filename, {encoding: 'utf8'}));
}

export default (req, res, next) => {
  let pathname = url.parse(req.url).pathname;
  let component = router[pathname];
  if (component) {
    let statics = require('./components/' + component).statics();
    let data = {
      title: statics.title || '',
      keywords: statics.keywords || '',
      description: statics.description || '',
      body: React.renderToString(
        React.createElement(App, {
          path: pathname
        })
      )
    };
    res.end(readTemplateString()(data));
  } else {
    next();
  }
}
