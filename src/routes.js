import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute
} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Task from './components/Task';
import User from './components/User';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="user/:userID" component={User} />
    <Route path="tasks/:taskID" component={Task} />
    <Redirect from="todos/:taskID" to="tasks/:taskID" />
  </Route>
);
