'use strict';

import React from 'react';
import { Link } from 'react-router';
import PageComponent from '../PageComponent';
import fetch from '../../utils/fetch';
// 1. 引入preload模块
import preload from '../../decorators/preload';
// import marine from '../../../config/marine';

// 2. 给组件类加上装饰器
@preload()
export default class extends PageComponent {
// export default class extends PageComponent {

  constructor(props) {
    super(props);
  }

  // 3. 定义静态属性，后端渲染时会输出
  static title = '首页';
  static keywords = 'a,b,c';
  static description = '描述文字';
  // 4. 定义默认state
  static defaultState = {
    name: '',
    list: [],
  };

  // 5. 编写名为observe的静态方法
  // 主要用途是（前、后端）获取数据
  static observe(params) {
    return fetch('/api/test');
  }

  render() {

    // 6. 从props中获取数据
    let state = this.props;
    return (
      <div>
        <h1>Home, {state.name}</h1>
        <Link to="/about">关于我们</Link>
        <ul>
          {
            state.list.map((item, index) => (
              <li key={`${index}`}>{item+index}</li>
            ))
          }
        </ul>
      </div>
    )
  }
};
