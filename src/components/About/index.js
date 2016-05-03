'use strict';

import React from 'react';
import { Link } from 'react-router';
import PageComponent from '../PageComponent';
import preload from '../../decorators/preload';
import fetch from '../../core/fetch';

@preload()
class About extends PageComponent {

  constructor(props) {
    super(props);
  }

  static title = '关于我们';
  static keywords = 'about us';
  static description = '描述文字';
  static defaultState = {
    name: '',
    list: [],
  };

  static observe(params) {
    return fetch('/api/test');
  }

  render() {
    let state = this.props;
    return (
      <div>
        <h1>About us, {state.name}</h1>
        <Link to="/">返回</Link>
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
}

module.exports = About;
