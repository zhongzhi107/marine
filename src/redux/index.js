import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import home from './home';
import user from './user';


export default combineReducers({
  // routing: routerReducer,
  home,
  user,
});
