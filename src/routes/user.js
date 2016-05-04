'use strict';

export default {
  path: 'user/:userId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/User'));
    })
  }
}
