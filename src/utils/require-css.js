'use strict';

import require_hacker from 'require-hacker';
import fs from 'fs';

// mount require() hook
require_hacker.hook('css', path => {
  return `module.exports = "${fs.readFileSync(path, {encoding: 'utf8'}).replace(/\n/g, '\\n').replace(/"/g, '\"')}"`
});
