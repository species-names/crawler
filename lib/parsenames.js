'use strict';

module.exports = function (text) {
  const regex = /\{\{VN .* \}\}/g;
  let m;
  var names = {};

  while ((m = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    if (m[0] !== undefined) {
      //parse names & language
      let allNames = m[0].substr(6);
      allNames = allNames.substr(0, allNames.length - 2);
      const splittedByPipe = allNames.split('|');
      splittedByPipe.forEach(
        function (langAndName) {
          const splitted = langAndName.split('=');
          names[splitted[0]] = splitted[1].trim();
        }
      );
    }
  }

  return names;
};
