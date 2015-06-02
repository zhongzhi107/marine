import React from 'react';
import Menu from '../Menu';

class LoginPage {

  constructor() {
    // static property
    // LoginPage.title = 'Login ... ';
    this.state = {name: 'Zhongzhi'};
  }

  static statics() {
    return {
      title: '登录',
      keywords: '登录',
      description: '登录去哪儿网'
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="login-page">
        <h1>{LoginPage.statics().title}</h1>
        <Menu />
      </div>
    );
  }
}

export default LoginPage;
