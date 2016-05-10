'use strict';

import webpackConfig from './webpack';

export default webpackConfig({
	release: true,
	longTermCaching: true,
});
