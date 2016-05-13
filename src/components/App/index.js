'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

// 服务器端渲染时不包含css的模块
if (process.env.BROWSER) {
  require('./App.less');
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleClick() {
    console.log('click');
  }

  render() {
    return (
      <div>
        <h1>这是导航栏1111</h1>
        <ul>
          <li><Link to="/user/123" activeClassName="active">Bob</Link></li>
          <li><Link to="/user/abc" activeClassName="active">Sally</Link></li>
        </ul>
        {/*<Button color="red" onClick={this._handleClick}> Hello World!</Button>*/}
        {this.props.children}
      </div>
    );
  }

}
