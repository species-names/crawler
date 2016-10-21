'use strict';
var R = require('ramda');

module.exports.detectSpecies = function (genera, link) {
  const first = R.head(link.split(' '));
  return first === genera;
};
