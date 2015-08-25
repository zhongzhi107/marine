'use strict';
// import 'babel/polyfill';
import React from 'react';
import App from './components/App';
import Dispatcher from './dispatcher/Dispatcher';
import { ActionTypes } from './constants/Constants';

let path = decodeURI(window.location.pathname);
let props = {
  path: path
};
let element = React.createElement(App, props);
React.render(element, document.getElementById('app'));

Dispatcher.register((action) => {
  if (action.type === ActionTypes.CHANGE_LOCATION) {
    console.log('====dispatcher change_location====', action);
    element = React.cloneElement(element, {path: action.path});
    React.render(element, document.getElementById('app'));
  }
});
