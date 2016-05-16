// server-side hack require-react-css-modules

'use strict';

import require_hacker from 'require-hacker';

// mount require() hook
require_hacker.global_hook('react-css-modules', path => {
  if (path.indexOf('react-css-modules') < 0) {
    return;
  }
  return 'module.exports = function(styles) {return function(target) {console.log("========1111=====", styles)}}'
});
