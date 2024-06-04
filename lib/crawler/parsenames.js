"use strict";

/**
 *
 * @param {string} text
 * @returns {{}}
 */
module.exports = function (text) {
  const regex = /\{\{VN.*?\}\}/g;
  let m;
  let names = {};
  text = text.replace(/(\r\n|\n|\r)/gm, "");
  while ((m = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (m[0] !== undefined) {
      // parse names & language
      let allNames = m[0].substr(m[0].indexOf("|") + 1);
      allNames = allNames.substr(0, allNames.length - 2);
      const splittedByPipe = allNames.split("|");
      splittedByPipe.forEach(function (langAndName) {
        const splitted = langAndName.split("=");
        if (splitted.length > 1) {
          let cleanName = splitted[1].replace(/\s+/g, " ");
          names[splitted[0]] = cleanName.trim();
        }
      });
    }
  }
  return names;
};
