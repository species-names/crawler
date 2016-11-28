'use strict';

var accessor = require('./accessor');

module.exports.parseLinksFromQueryData = function (regexTerm, data) {
  let links = [];
  let text = accessor.getContentFromQuery(data);
  if (text) {
    text = text.replace(/(?:\r\n|\r|\n)/g, '');
    const regex = new RegExp(regexTerm + '.{0,10}:.*?==', 'g');
    let m;
    const parseCurlyLinkList = function (text) {
      let preparedText = text.substr(text.indexOf('{')).trim();
      preparedText = preparedText.substr(0, preparedText.indexOf('='));
      const constLinkRegex = /\{\{.*?\}\}/gm;
      let linksRaw;
      while ((linksRaw = constLinkRegex.exec(preparedText)) !== null) {
        if (linksRaw.index === constLinkRegex.lastIndex) {
          constLinkRegex.lastIndex++;
        }
        linksRaw.forEach(function (link) {
          const splitted = link.split('|');
          if (splitted.length > 1) {
            links.push(splitted[1].replace(/\}/gm, '').replace(/\[/gm, '')
            .replace(/\]/gm, '').trim());
          }
        });
      }
    };

    const parseSquareBracketLinkList = function (text) {
      let foundLink;
      const regexLink = /\[.*?\]/g;
      while ((foundLink = regexLink.exec(text)) !== null) {
        if (foundLink.index === regexLink.lastIndex) {
          regexLink.lastIndex++;
        }
        foundLink.forEach(function (occurence) {
          let link = occurence.trim().substr(2, (occurence.length - 3));
          if (link.indexOf('|') > 0) {
            const splitted = link.split('|');
            if (splitted.length > 1) {
              link = splitted[0].trim();
            }
          }
          links.push(link);
        });
      }
    };

    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      if (m[0] !== undefined) {
        parseCurlyLinkList(m[0]);
        if (links.length === 0) {
          parseSquareBracketLinkList(m[0]);
        }
      }
    }
    return links;
  }
};
