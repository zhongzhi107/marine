'use strict';

import marine from '../marine';

var assetsType = marine.assetsType.join(',');

export default {
  dist: {
    files: {
      src: [
        `<%=ma.path.dist%>/**/*.{${assetsType}}`,
        '!<%=ma.path.dist%>/images/expression/**/*'
      ]
    }
  }
};
