'use strict';

import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import PageComponent from '../PageComponent';
import fetch from '../../utils/fetch';
// import { asyncConnect } from 'redux-async-connect'
// 1. 引入preload模块
// import prefetchData from '../../decorators/prefetchData';
// import marine from '../../../config/marine';
// import CSSModules from 'react-css-modules';
// import styles from './test.css';
// console.log('=====css', styles, CSSModules);

// 2. 给组件类加上装饰器
// @prefetchData()
// CSSModules顺序在最下面
// @CSSModules(styles)
// @asyncConnect({
//   lunch: (params, helpers) => Promise.resolve({id: 1, name: 'Borsch'})
// })

// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//
//     if (!isInfoLoaded(getState())) {
//       promises.push(dispatch(loadInfo()));
//     }
//     if (!isAuthLoaded(getState())) {
//       promises.push(dispatch(loadAuth()));
//     }
//
//     return Promise.all(promises);
//   }
// }])

@connect(state => (state))
export default class extends PageComponent {

  constructor(props) {
    super(props);
    console.log(props);
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

  // static propTypes = {
  //   time: PropTypes.number
  // }

  render() {

    // 6. 从props中获取数据
    let props = this.props;
    return (
      <div>
        <h1 styleName="joe">Home, {props.user.user}</h1>
        <Link to="/about">关于我们</Link>
        {/*
        <ul>
          {
            props.home.list.map((item, index) => (
              <li key={`${index}`}>{item+index}</li>
            ))
          }
        </ul>
        */}
      </div>
    )
  }
};

// export default CSSModules(Home, styles);
