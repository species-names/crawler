'use strict';

var jsonfile = require('jsonfile');

/**
 *
 * @param scientificName
 * @param commonNames
 * @returns {{scientific_name: string, common_names: Array}}
 */
exports.createSpeciesObject = function (scientificName, commonNames) {
  let obj = {
    scientific_name: scientificName,
    common_names: []
  };
  Object.keys(commonNames).forEach(function (lang) {
    obj.common_names.push({
      lang: lang,
      name: commonNames[lang]
    });
  });

  return obj;
};

// exports.dumpJson = function (file, species, callback) {
//   jsonfile.writeFile(file, species, callback);
// };
