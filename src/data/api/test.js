/**
* @fileOverview test data for veloctiy template when the template load.
* @parameter _GET {JSON} data get from url query
* @return {JSON}
*/

'use strict';

module.exports = (req, res) => {
  let data = {
    name: 'Joe',
    list: [
      'Java', 'C#', 'PHP'
    ]
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};
