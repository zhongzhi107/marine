import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import Link from '../Link';

class Menu extends React.Component {

  componentWillMount() {
    if (canUseDOM) {
      require('./Menu.less');
    }
  }

  render() {
    return (
      <div className="menu">
        <ul className="inline">
          {
            [
              {name: '首页', url: '/'},
              {name: '客服', url: '/kefu'},
              {name: '订单', url: '/dingdan'},
              {name: '发现', url: '/faxian'},
              {name: '我的', url: '/usercenter'},
            ].map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.url} className={index == this.props.selected ? "current" : ""}>
                    {item.name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

}

export default Menu;
