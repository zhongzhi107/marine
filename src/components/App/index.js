import React, { PropTypes } from 'react';
import IndexPage from '../IndexPage';
import LoginPage from '../LoginPage';
import UsercenterPage from '../UsercenterPage';
import router from '../../router-component';
import Store from '../../stores/Store';
import Dispatcher from '../../dispatcher/Dispatcher';
import { ActionTypes } from '../../constants/Constants';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

class App {
  // static propTypes = {
  //   path: PropTypes.string.isRequired,
  //   onSetTitle: PropTypes.func.isRequired,
  //   onSetMeta: PropTypes.func.isRequired,
  //   onPageNotFound: PropTypes.func.isRequired
  // };

  componentWillMount() {
    if (canUseDOM) {
      require('./App.less');
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {
    // TODO: webpack cause warning.
    //let page = require('../IndexPage');// + router[this.props.path]);
    // let page = require('../' + router[this.props.path]);
    //this.component = React.createElement(page);

    switch (this.props.path) {

      case '/':
        this.setTitle(IndexPage.statics().title);
        this.component = <IndexPage />;
        break;

      case '/login':
        this.setTitle(LoginPage.statics().title);
        this.component = <LoginPage />;
        break;

      case '/usercenter':
        this.setTitle(UsercenterPage.statics().title);
        this.component = <UsercenterPage />;
        break;

      default:
        console.error('[Router error]' + this.props.path);
    }

    return (
      <div>
        {this.component}
      </div>
    );
  }

  handlePopState() {
    let path = window.location.pathname;
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_LOCATION,
      path: path
    });
  }

  setTitle(title) {
    if (canUseDOM) {
      document.title = title;
    }
  }
}

export default App;
