'use strict';

var accessor = require('./accessor');

module.exports.parseLinksFromQueryData = function (regexTerm, data) {
  let links = [];
  let text = accessor.getContentFromQuery(data);
  if (text) {
    text = text.replace(/(?:\r\n|\r|\n)/g, '');
    // https://species.wikimedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=Apterygiformes&format=json
    // https://species.wikimedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=Trochiliformes&format=json
    // Error: Error returned by API: Bad title "Dromaius †{{glast"
    const regex = new RegExp(regexTerm + '.{0,10}:.*?==', 'g');
    let m;
    const parseCurlyLinkList = function (text) {
      let preparedText = text.substr(text.indexOf('{')).trim();
      preparedText = preparedText.substr(0, preparedText.indexOf('='));
      const linksRaw = preparedText.split('}} {{');
      linksRaw.forEach(function (link) {
        const splitted = link.split('|');
        if (splitted.length > 1) {
          links.push(splitted[1].replace(/\}/gm, '').trim());
        }
      });
    };

    const parseSquareBracketLinkList = function (text) {
      let foundLink;
      const regexLink = /\[.*?\]/g;
      while ((foundLink = regexLink.exec(text)) !== null) {
        if (foundLink.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        foundLink.forEach(function (occurence) {
          links.push(occurence.trim().substr(2, (occurence.length - 3)));
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
