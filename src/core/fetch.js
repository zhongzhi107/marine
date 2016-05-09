'use strict';

import request from 'superagent';
import url from 'url';
import marine from '../../config/marine';

var makeURL = (endpoint) => {
  // 同域地址和外域地址区分处理
  if (process.browser) {
    return endpoint;
  } else {
    let urlObject = url.parse(endpoint);
    return urlObject.protocol ?
      endpoint :
      `http://localhost:${marine.port.www}${endpoint}`;
  }
};

var makePromise = (uri) => {
  return new Promise((resolve, reject) => {
    request(uri, (error, res) => {
      if (error || res.statusCode !== 200) {
        reject(error);
      } else {
        resolve(res.body);
      }
    });
  });
};

var fetch = (endpoint) => {
  return makePromise( makeURL(endpoint) );
};

export default fetch;
