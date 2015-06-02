import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import Dispatcher from '../dispatcher/Dispatcher';
import {ActionTypes} from '../constants/Constants';

export default {
  goto(path, options) {
    if (canUseDOM) {
      if (options && options.replace) {
        window.history.replaceState({}, document.title, path);
      } else {
        window.history.pushState({}, document.title, path);
      }
    }

    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_LOCATION,
      path: path
    });
  }
}
