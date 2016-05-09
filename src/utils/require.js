/**
 * 让nodejs支持require.ensure
 */
'use strict';

let proto = Object.getPrototypeOf(require);
!proto.hasOwnProperty('ensure') && Object.defineProperties(proto, {
  'ensure': {
    value: function ensure(modules, callback) {
      callback(this);
    },
    writable: false
  },
  'include': {
    value: function include() {},
    writable: false
  }
});
