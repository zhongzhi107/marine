'use strict';

import React from 'react';
import { Link } from 'react-router';
import PageComponent from '../PageComponent';
import prefetchData from '../../decorators/prefetchData';

@prefetchData()
export default class extends PageComponent {
  static title = '用户<%=userId%>';
  static keywords = '关键字1';
  static description = '描述文字';

  render() {
    const { userId } = this.props.params;

    return (
      <div>
        <h1>User id: {userId}</h1>
        <div>
          <Link to="/" activeClassName="active">返回首页</Link>
        </div>
      </div>
    )
  }
};
