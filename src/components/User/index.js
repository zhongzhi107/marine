'use strict';

import React from 'react';
import { Link } from 'react-router';
import PageComponent from '../PageComponent';
import preload from '../../decorators/preload';

@preload()
class User extends PageComponent {
  static title = '用户<%=userID%>';
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
}

module.exports = User;
