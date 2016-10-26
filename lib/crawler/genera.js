'use strict';

/**
 *
 * @param {string} scientificName
 * @param {object} commonNames
 * @returns {{scientific_name: string, common_names: Array}}
 */
exports.createSpeciesObject = function (scientificName, commonNames) {
  let obj = {
    /* eslint camelcase: "off" */
    scientific_name: scientificName,
    /* eslint camelcase: "off" */
    common_names: []
  };
  Object.keys(commonNames).forEach(function (lang) {
    if (scientificName !== commonNames[lang]) {
      obj.common_names.push({
        lang: lang,
        name: commonNames[lang]
      });
    }
  });

  return obj;
};
