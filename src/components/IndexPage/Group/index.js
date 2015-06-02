import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import Link from '../../Link';

var start = 0, end = 0;

class Group extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 0
    };
  }

  componentWillMount() {
    if (canUseDOM) {
      require('./Group.less');
    }
  }

  render() {
    let pagePrevious = '';
    let pageNext = '';

    if (this.state.current === 0) {
      pageNext = <span className="pager next" onClick={this.pageNext.bind(this)}></span>;
    } else {
      pagePrevious = <span className="pager previous" onClick={this.pagePrevious.bind(this)}></span>;
    }

    let h2Style = {
      color: this.props.data.color
    };

    let linkStyle = {
      backgroundColor: this.props.data.color
    };

    var subChannels = this.props.data.subChannels;

    return (
      <div className='group'>
        <div className="title">
          <h2 style={h2Style}>{this.props.data.title}</h2>
          <div className="indicator">
            <ul>
              <li className={this.state.current === 0 ? 'current' : ''}></li>
              <li className={this.state.current === 1 ? 'current' : ''}></li>
            </ul>
          </div>
        </div>
        <div className="channels-wrapper">
          <div className={this.state.current === 0 ? 'channels' : 'channels right'}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd.bind(this)}>
            <div className="channel">
              <div className="col">
                <Link style={linkStyle} href={subChannels[0].url}>{subChannels[0].name}</Link>
              </div>
              <div className="col">
                <Link style={linkStyle} href={subChannels[1].url}>{subChannels[1].name}</Link>
                <Link style={linkStyle} href={subChannels[2].url}>{subChannels[2].name}</Link>
              </div>
              <div className="col">
                <Link style={linkStyle} href={subChannels[3].url}>{subChannels[3].name}</Link>
                <Link style={linkStyle} href={subChannels[4].url}>{subChannels[4].name}</Link>
              </div>
            </div>
            <div className="channel">
              <div className="col">
                <Link style={linkStyle} href={subChannels[5].url}>{subChannels[5].name}</Link>
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </div>
        </div>
        {pagePrevious}
        {pageNext}
      </div>
    );
  }

  pagePrevious() {
    this.setState({
      current: 0
    });
  }

  pageNext() {
    this.setState({
      current: 1
    });
  }

  touchStart(e) {
    start = e.touches[0].clientX;
  }

  touchMove(e) {
    end = e.touches[0].clientX;
  }

  touchEnd(e) {
    this.setState({
      current: end > start ? 0 : 1
    });
  }
}

export default Group;
