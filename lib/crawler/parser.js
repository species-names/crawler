'use strict';

var accessor = require('./accessor');

module.exports.parseLinksFromQueryData = function (regexTerm, data) {
  let links = [];
  const text = accessor.getContentFromQuery(data);
  if (text) {
    const regex = new RegExp(regexTerm + ':.*', 'g');
    let m;
    const parseLinkList = function (text) {
      const linksRaw = text.substr(text.indexOf('{')).trim().split('}} {{');
      linksRaw.forEach(function (link) {
        const splitted = link.split('|');
        if (splitted.length > 1) {
          links.push(splitted[1].replace(/\}/gm, '').trim());
        }
      });
    };
    const parseSingleLink = function (text) {
      let foundLink;
      const regexLink = /\[.*\]/g;
      while ((foundLink = regexLink.exec(text)) !== null) {
        if (foundLink.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        if (foundLink[0] !== undefined) {
          links.push(foundLink[0].trim().substr(2, (foundLink[0].length - 4)));
        }
      }
    };

    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      if (m[0] !== undefined) {
        // multiple links
        parseLinkList(m[0]);
        if (links.length === 0) {
          parseSingleLink(m[0]);
        }
      }
    }
    return links;
  }
};
