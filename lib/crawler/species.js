'use strict';

var R = require('ramda');
var accessor = require('./accessor');
var parsenames = require('./parsenames');
var jsonfile = require('jsonfile');
jsonfile.spaces = 2;

/**
 *
 * @param client
 * @param pathToFiles
 * @param genus
 * @constructor
 */
function Species(client, pathToFiles, genus) {
  this.client = client;
  this.results = [];
  this.pathToFiles = pathToFiles;
  this.genus = genus;
}

/**
 * process species list and write names to file
 */
Species.prototype.processSpeciesList = function (list) {
  var self = this;
  if (list.length === 0) {
    // complete
    const file = this.pathToFiles + '/' + this.genus + '.json';
    jsonfile.writeFile(file, this.results, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('written: ' + file);
    });
    return;
  }

  let specieQuery = list.pop();

  Species.getSpecie(self.client, specieQuery, function (result) {
    self.results.push(result);
    self.processSpeciesList(list);
  });
};

/**
 * check if first word is genus, then we assume we have a species
 *
 * @param {string} genus
 * @param {string} link
 * @returns {boolean}
 */
Species.detectSpecies = function (genus, link) {
  const split = link.split(' ');
  if (split.length === 1) {
    return false;
  }
  const first = R.head(split);
  return first === genus;
};

/**
 * call wiki api to load species page
 * and create species object
 *
 * @param {bot} client
 * @param {string} genus
 * @callback callback
 */
Species.getSpecie = function (client, genus, callback) {
  const params = {
    action: 'query',
    titles: genus,
    prop: 'revisions',
    rvlimit: 1,
    rvprop: 'content'
  };
  client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const text = accessor.getContentFromQuery(data);
    const obj = Species.createSpeciesObject(genus, parsenames(text));
    callback(obj);
  });
};

/**
 * create names object
 *
 * @param {string} scientificName
 * @param {object} commonNames
 * @returns {{scientific_name: string, common_names: Array}}
 */
Species.createSpeciesObject = function (scientificName, commonNames) {
  let obj = {
    /* eslint camelcase: "off" */
    scientific_name: scientificName,
    /* eslint camelcase: "off" */
    common_names: []
  };
  const cleanName = function (s) {
    let str = s.trim();
    if (str[str.length - 1] === '.') {
      str = str.slice(0, -1);
    }
    return str;
  };
  const detectSynonyms = function (name, delimiter, synonyms) {
    let synonymsClean = synonyms;
    delimiter.map(function (d) {
      if (name.indexOf(d) > 0) {
        synonyms = name.split(d);
        synonymsClean = synonyms.map(cleanName);
      }
      return d;
    });
    return synonymsClean;
  };
  Object.keys(commonNames).forEach(function (lang) {
    if (scientificName !== commonNames[lang]) {
      let name = commonNames[lang];
      const synonyms = detectSynonyms(name, [',', ' or ', '/'], []);
      const speciesObj = {
        lang: lang,
        name: name
      };
      if (synonyms.length > 0) {
        speciesObj.synonyms = synonyms;
        speciesObj.name = synonyms.shift();
      }
      obj.common_names.push(speciesObj);
    }
  });

  return obj;
};

module.exports = Species;
