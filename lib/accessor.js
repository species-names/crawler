/**
 * gets the content from a query call json response
 *
 * @param body
 * @returns {undefined}
 */
exports.getContentFromQuery = function (body) {
  const pages = body.query.pages;
  var content = undefined;
  Object.keys(pages).forEach(function (key) {
    const page = pages[key];
    content = page.revisions[0]['*'];
  });
  return content;
};

