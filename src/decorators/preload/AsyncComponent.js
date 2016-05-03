'use strict';

import { Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

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
      if (window.PAGE_INITIAL_STATE) {
        let pageInitialState;
        try {
          pageInitialState = JSON.parse(window.PAGE_INITIAL_STATE);
          Object.assign(newState, pageInitialState);
        } catch (e) {}
        // 使用一次后销毁，防止后续页面再使用该变量
        window.PAGE_INITIAL_STATE = null;
      }
      if (JSON.stringify(newState) === JSON.stringify(defaultState)) {
        // target.observe 类的静态方法
        // 确保组件实现了observe方法
        if (!target.observe) {
          invariant(
            false,
            'Component should implement observe() static method'
          );
        }

        target.observe().then((data) => {
          this.state = data;
          this.forceUpdate();
        });
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
