
import React from 'react';
import AppActions from '../../actions/AppActions';

class Link extends React.Component {

  render() {
    return (
      <a onClick={this.handleClick.bind(this)} {...this.props}>{this.props.children}</a>
    );
  }

  handleClick(e) {
    e.preventDefault();
    AppActions.goto(this.props.href);
  }

}

export default Link;
