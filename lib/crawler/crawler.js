'use strict';

var bot = require('nodemw');
var accessor = require('./accessor');
var R = require('ramda');
var jsonfile = require('jsonfile');
jsonfile.spaces = 2;
var species = require('./species');

/**
 *
 * @param {object} options
 * @constructor
 */
function Crawler(options) {
  /* eslint new-cap: "off" */
  this.client = new bot(options);
  this.results = [];
}

/**
 *
 * @param {string} title
 */
Crawler.prototype.crawl = function (title) {
  this.iterateLinks(title, this.iterateLinks.bind(this));
};

Crawler.prototype.iterateLinks = function (title, callback) {
  let visitedLinks = [];
  const params = {action: 'parse', page: title};
  var self = this;
  this.client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const links = accessor.getLinksFromParse(data);
    let speciesList = [];
    let otherLinks = [];
    links.forEach(function (link) {
      const name = R.prop('*', link);
      if (species.detectSpecies(params.page, name)) {
        console.log('is species: ' + name + ' of ' + params.page);
        speciesList.push(name);
      } else if (name.length > 0) {
        otherLinks.push(name);
      }
    });

    if (speciesList.length === 0) {
      otherLinks.forEach(function (name) {
        if (R.indexOf(name, visitedLinks) === -1 && name !== '') {
          console.log('calling next link: ' + name);
          visitedLinks.push(name);
          callback(name, function () {
            return;
          });
        }
      });
    } else {
      self.processList(params.page, speciesList);
    }
  });
};

Crawler.prototype.processList = function (name, list) {
  var self = this;
  if (list.length === 0) {
    // complete
    const file = './data/' + name + '.json';
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

  species.getSpecie(this.client, specieQuery, function (result) {
    self.results.push(result);
    self.processList(name, list);
  });
};
// export the class
module.exports = Crawler;
