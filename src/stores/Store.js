import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import { ActionTypes } from '../constants/Constants.js';

const CHANGE_EVENT = 'change';

var AppStore = Object.assign({}, EventEmitter.prototype, {

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

AppStore.dispatchToken = Dispatcher.register((action) => {

  switch (action.type) {

    case ActionTypes.GET_PAGE:
      //loading = true;
      AppStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

export default AppStore;
