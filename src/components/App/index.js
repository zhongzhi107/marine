'use strict';

import React, {Component} from 'react';
import AppStore from '../../stores/AppStore';
import ChatPage from '../ChatPage';
import LoginPage from '../LoginPage';

function getState() {
  return {
    me: AppStore.getMe()
  };
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    var isLogin = AppStore.getMe().isLogin;
    return (
      isLogin ? <ChatPage /> : <LoginPage />
    );
  }

  _onChange() {
    this.setState(getState());
  }
}

export default App;
