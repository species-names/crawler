'use strict';
var R = require('ramda');
var accessor = require('./accessor');
var parsenames = require('./parsenames');
var genera = require('./genera');

/*
constructor(genus, speciesList)
this.result = [];
this.processSpeciesList
iterate, call getSpecie, write to file
 */

/**
 *
 * @param {string} genera
 * @param {string} link
 * @returns {boolean}
 */
module.exports.detectSpecies = function (genera, link) {
  const split = link.split(' ');
  if (split.length === 1) {
    return false;
  }
  const first = R.head(split);
  return first === genera;
};

module.exports.getSpecie = function (client, name, callback) {
  const params = {
    action: 'query',
    titles: name,
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
    const obj = genera.createSpeciesObject(name, parsenames(text));
    callback(obj); //todo maybe use event here as well
  });
};
