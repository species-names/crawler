'use strict';

var accessor = require('./accessor');

module.exports.parseLinksFromQueryData = function (regexTerm, data) {
  let links = [];
  let text = accessor.getContentFromQuery(data);
  if (text) {
    const regex = new RegExp(regexTerm + ':.*', 'g');
    let m;

    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      if (m[0] !== undefined) {
        //multiple links
        const linksRaw = m[0].substr(m[0].indexOf('{')).trim().split('}} {{');
        linksRaw.forEach(function (link) {
          const splitted = link.split('|');
          if (splitted.length > 0) {
            links.push(splitted[1].replace(/\}/gm, '').trim());
          }
        });
      }
    }
    return links;
  }
};

module.exports.parseLinkFromQueryData = function (regexTerm, data) {
  // todo single link: ''[[Sagittarius]]''
  const regex = /Genus:.*?\\n/g;
};
