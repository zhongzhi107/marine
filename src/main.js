'use strict';

// This file bootstraps the entire application.

import React from 'react';
import App from './components/App';

window.React = React; // export for http://fb.me/react-devtools

React.render(
    <App />,
    document.getElementById('app')
);
