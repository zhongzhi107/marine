import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import http from 'superagent';
import Group from './Group';
import Menu from '../Menu';

class IndexPage {

  constructor() {
    // this.state = {name: 'Zhongzhi'};
  }

  static statics() {
    return {
      title: '去哪儿网',
      keywords: '机票,飞机票,机票查询,飞机票查询,机票预订,特价机票,机票预定,打折机票',
      description: '去哪儿网提供机票,飞机票,特价机票,打折机票的查询预订；'
    };
  }

  componentWillMount() {
    if (canUseDOM) {
      require('./Index.less');
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let groups = [], channels = {
      hotel: {
        title: '酒店住宿',
        color: '#f55',
        subChannels: [
          { name: '酒店', url: '/hotel' },
          { name: '酒店团购', url: '/hotel' },
          { name: '公寓', url: 'http://touch.gongyu.qunar.com/' },
          { name: '今日特惠', url: '/hotel' },
          { name: '钟点房', url: '/hotel' },
          { name: '客栈民宿', url: '/hotel' },
        ]
      },
      flight: {
        title: '交通出行',
        color: '#03a9f4',
        subChannels: [
          { name: '机票', url: '/flight'},
          { name: '火车票', url: '/flight'},
          { name: '车车', url: '/car'},
          { name: '特价机票', url: '/flight'},
          { name: '接送用车', url: '/flight'},
          { name: '汽车票', url: '/flight'},
        ]
      },
      guide: {
        title: '旅游&攻略',
        color: '#7eb63d',
        subChannels: [
          { name: '旅游度假', url: '/flight'},
          { name: '门票', url: '/flight'},
          { name: '签证', url: '/car'},
          { name: '攻略', url: '/flight'},
          { name: '旅游团购', url: '/flight'},
          { name: '骆驼书', url: '/flight'},
        ]
      },
      nearby: {
        title: '周边生活',
        color: '#ff9800',
        subChannels: [
          { name: '本地玩乐', url: '/flight'},
          { name: '电影票', url: '/flight'},
          { name: '外卖', url: '/car'},
          { name: '周末游', url: '/flight'},
          { name: '美食', url: '/flight'},
          { name: '导游 Wi-Fi', url: '/flight'},
        ]
      }
    };

    for(let key in channels) {
      groups.push(<Group key={key} data={channels[key]} />);
    }

    return (
      <div className="index-page">
        <div className="main">{groups}</div>
        <Menu selected="0"/>
      </div>
    );
  }

  getData() {
    http.get('/a', function(err, res){
      if (err) { throw err; }
      //this.setState(JSON.parse(res.text));
    }.bind(this));
  }

}

export default IndexPage;
