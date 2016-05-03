'use strict';

import React from 'react';
import AsyncComponent from './AsyncComponent';
// import invariant from 'fbjs/lib/invariant';

function preload() {
  return (Target) => {
    return class extends AsyncComponent {
      static observe(params) {
        return Target.observe(params);
      }

      constructor(props) {
        super(props, Target);
      }

      render() {
        let props = {};
        Object.assign(props, this.props, this.state);
        return <Target {...props} />;
      }
    };
  };

}

export default preload;
