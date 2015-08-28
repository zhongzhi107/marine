'use strict';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppStore from '../../stores/AppStore';
import AppConstants from '../../constants/AppConstants';

var client = null;
var _uid;

function getState() {
  return {
    me: AppStore.getMe(),
    sessions: AppStore.getSessions()
  };
}

class ChatPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = getState();

    console.log('constructor this state', this.state);
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this));

    // websocket
    client = getImClient();
    client.setHosts(['ws://l-yacca1.wap.cn6.qunar.com:9494']);
    client.setAppName(UTF8.encode('OChat'));
    var _did = 0;
    var uuid = '';//web端不传

    var qcookie = 'U.vxlgwrw8014';
    var vcookie = 'WHfKgEFwqOgyQQ_OSlSykv8pA9ajokEMr9TGiB7nflfn_soLrWnIKRw5GVL-wbiVYVYxE7uftTrAtMM2VJDruSai1GOF3cion0-3CmBSgxBBLX_eFNbwinmvWNftNbpnFecWUm8fmqPrePY8ic-Glmft8usOtHS7BSqmOaQ5LT4m';
    var tcookie = '24011036';

    client.recv = function(json) {
      if(json.t) {
        console.log(json);
      } else if(json.bstatus) {
        console.info(json);
      }
    };

    client.onConnect = function () {
      console.log('connected');
      login();
    };
    client.connect();

    function login () {
      client.request({
        json:{
          t:1,
          uId:_uid,
          c:{
            iv:'ws.0.1',
            uuid:uuid,
            qcookie: qcookie,
            vcookie: vcookie,
            tcookie: tcookie
          }
        },
        okCallback: loginSuccess,
        errCallback: console.log
      });
    }

    function loginSuccess(json) {
      // clearAll();
      console.log('login return:', json);
      if (json.ret === 0) {
        console.log('login success!');
        _uid = json.uId;
        AppDispatcher.dispatch({
          actionType: AppConstants.USER_UPDATE,
          me: {
            isLogin: true,
            name: json.name,
            uId: json.uId,
            img: json.img
          }
        });
        getSessionList();
      } else {
        console.log('login fail!');
      }
    }

    function getSessionList() {
      client.request({
        json: {
          t: 15,
          uId: _uid
        },
        okCallback: getSessionListSuccess,
        errCallback: console.log
      });
    }

    function getSessionListSuccess(json) {
      console.log('session list: ', json.sesList);
      AppDispatcher.dispatch({
        actionType: AppConstants.SESSION_INIT,
        sessionList: json.sesList
      });
    }
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let self = this;
    var sessionList = [];
    console.log(this.state.sessions);
    this.state.sessions.forEach(function(item) {
      sessionList.push(<li key={item.id} onClick={self._getHistoryMessage}>{item.name}</li>);
    });

    return (
      <div>
        <h1>Hello, {this.state.me.name}.</h1>
        <div>
          <img src={this.state.me.img} />
        </div>
        <ul>
          {sessionList}
        </ul>
        <button onClick={this._logout.bind(this)}>Logout</button>
      </div>
    );
  }

  _onChange() {
    this.setState(getState());
  }

  _getHistoryMessage() {
    client.request({
      json:{
        t: 13,
        reqid: 100,
        uId: _uid,
        sId: '1444487091',
        startId: 0,
        endId: 10
      },
      okCallback: console.log,
      errCallback: console.error
    });
  }

  _sendMessage() {}

  _receiveMessage() {}

  _logout() {
    // console.log('_click', AppConstants.USER_LOGIN_SUCCESS);
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_UPDATE,
      me: {
        name: null,
        uid: null,
        img: null,
        isLogin: false
      }
    });
  }


}

export default ChatPage;
