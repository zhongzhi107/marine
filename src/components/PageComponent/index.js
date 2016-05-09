/**
 * 页面基类
 */
'use strict';

import {Component} from 'react';
// import invariant from 'fbjs/lib/invariant';

export default class PageComponent extends Component {

  static title = '';
  static keywords = '';
  static description = '';
  static defaultState = {};

  static observe(params) {
    return Promise.resolve({});
    // invariant(
    //   false,
    //   'PageComponent subclass should implement observe() static class method'
    // );
  }

  constructor(props) {
    super(props);

    // 支持webpack HRM功能 
    if (module.hot) {
      module.hot.accept();
    }
  }
}
