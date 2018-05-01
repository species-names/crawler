'use strict';

var R = require('ramda');

/**
 * gets the content from a query call json response
 *
 * @param body
 * @returns {string}
 */
module.exports.getContentFromQuery = function (body) {
  const pages = R.path(['query', 'pages'], body);
  let content = '';
  if (pages) {
    Object.keys(pages).forEach(function (key) {
      const page = pages[key];
      if (page.revisions !== undefined && page.revisions.length > 0) {
        content = page.revisions[0]['*'];
      }
    });
  }

  return content;
};

/**
 * get links array from api result
 *
 * @param {object} data
 * @returns {string}
 */
module.exports.getLinksFromParse = function (data) {
  return R.pathOr('', ['parse', 'links'], data);
};

/**
 * get properties array from api result
 *
 * @param {object} data
 * @returns {string}
 */
module.exports.getPropertiesFromParse = function (data) {
  return R.pathOr('', ['parse', 'properties'], data);
};
