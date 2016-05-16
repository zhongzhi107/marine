'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
// import { asyncConnect } from 'redux-async-connect';

@connect(state => (state), {pushState: push})
export default class App extends Component {

  constructor(props) {
    super(props);
    // console.log(props);
  }

  render() {
    return (
      <div>
        <h1>这是导航栏</h1>
        <ul>
          <li><Link to="/user/123" activeClassName="active">Bob</Link></li>
          <li><Link to="/user/abc" activeClassName="active">Sally</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }

}
