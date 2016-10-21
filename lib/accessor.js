'use strict';

var R = require('ramda');

/**
 * gets the content from a query call json response
 *
 * @param body
 * @returns {undefined}
 */
module.exports.getContentFromQuery = function (body) {
  const pages = R.path(['query', 'pages'], body);
  var content = undefined;
  Object.keys(pages).forEach(function (key) {
    const page = pages[key];
    // content = R.prop('*', R.head(R.path(['revisions'], page)));
    content = page.revisions[0]['*'];
  });
  return content;
};

module.exports.getLinksFromParse = function (data) {
  return R.pathOr('', ['parse', 'links'], data);
};
