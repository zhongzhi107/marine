import React from 'react';
import {
  Route,
  Router,
} from 'react-router';
import Home from './components/Home';
import About from './components/About';
import User from './components/User';

export default (
  <Router>
    <Route path="/" component={Home} />
    <Route path="about" component={About} />
    <Route path="user/:userID" component={User} />
  </Router>
);

// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={Home} />
//     <Route path="about" component={About} />
//     <Route path="user/:userID" component={User} />
//     <Route path="tasks/:taskID" component={Task} />
//     <Redirect from="todos/:taskID" to="tasks/:taskID" />
//   </Route>
// );
