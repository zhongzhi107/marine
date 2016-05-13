'use strict';

import {Component} from 'react';
import {canUseDOM} from '../../utils/env';

export default class AsyncComponent extends Component {

  constructor(props, target) {
    super(props);

    // 存起来给componentWillMount用
    this.title = target.title;

    let defaultState = target.defaultState;
    let newState = {};
    Object.assign(newState, defaultState);

    // 浏览器端渲染
    if (process.browser) {
      if (window.__INITIAL_STATE__) {
        let pageInitialState;
        try {
          pageInitialState = JSON.parse(window.__INITIAL_STATE__);
          Object.assign(newState, pageInitialState);
        } catch (e) {}
        // 使用一次后销毁，防止后续页面再使用该变量
        window.__INITIAL_STATE__ = null;
      }

      if (JSON.stringify(newState) === JSON.stringify(defaultState)) {
        try {
          // target.observe 类的静态方法
          target.observe().then((data) => {
            this.state = data;
            this.forceUpdate();
          }).catch(() => {
            console.log('Promise rejected');
          });
        } catch (e) {
          console.warn('observe静态方法调用出错，它应该返回一个Promise');
        }
      }
    }

    // 服务器端渲染
    if (!process.browser && this.props.params.observe) {
       Object.assign(newState, this.props.params.observe);
    }

    this.state = newState;
  }

  componentWillMount() {
    // 修改网页标题
    if (canUseDOM) {
      document.title = this.title;
    }
  }

}
