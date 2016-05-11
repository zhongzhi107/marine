'use strict';

import webpackConfig from './webpack';

export default webpackConfig({
	release: true,
	minimize: true,
	longTermCaching: true,
});
