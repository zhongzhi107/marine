'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var me = {
  isLogin: true,
  name: '',
  img: '',
  uid: ''
};

var sessions = [];

function setMe(info) {
  me = info;
}

function setSessions(sessionList) {
  sessions = sessionList;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getMe: function() {
    return me;
  },

  getSessions: function() {
    return sessions;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  console.log('-----AppConstants.USER_UPDATE', AppConstants.USER_UPDATE);
  switch(action.actionType) {
    case AppConstants.USER_UPDATE:
      console.log('receive USER_UPDATE', action.me);
      setMe(action.me);
      AppStore.emitChange();
      break;

    case AppConstants.SESSION_INIT:
      console.log('====SESSION_INIT:', action.sessionList);
      setSessions(action.sessionList);
      AppStore.emitChange();
      break;

    default:
      // no op
  }

});

export default AppStore;
