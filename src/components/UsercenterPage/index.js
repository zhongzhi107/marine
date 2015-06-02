import React from 'react';
import Link from '../Link';
import Menu from '../Menu';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

class UsercenterPage {

  static statics() {
    return {
      title: '个人中心',
      keywords: '个人中心',
      description: '去哪儿网个人中心'
    };
  }

  componentWillMount() {
    if (canUseDOM) {
      require('./Usercenter.less');
    }
  }

  render() {
    return (
      <div className="usercenter-page">
        <div className="info">
          <div className="nologin">
            <Link className="button" href="/login">登 录</Link>
          </div>
        </div>

        <Menu selected="4"/>
      </div>
    );
  }
}

export default UsercenterPage;
