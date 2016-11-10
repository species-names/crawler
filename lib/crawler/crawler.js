'use strict';

var bot = require('nodemw');
var accessor = require('./accessor');
var R = require('ramda');
var Species = require('./species');
var familiae = require('./familiae');
const crawlerEmitter = require('./crawlerEmitter');
var path = require('path');

/**
 *
 * @param {object} options
 * @constructor
 */
function Crawler(options) {
  /* eslint new-cap: "off" */
  this.client = new bot(options);
  this.results = [];
  this.emitter = new crawlerEmitter();
}

/**
 *
 * @param {string} title
 */
Crawler.prototype.crawl = function (ops) {
  var self = this;

  if (!R.has('familia', ops) && !R.has('genus', ops)) {
    console.log('at least one option needs to be specified. run --help to see your options.');
  } else {
    if (ops.familia !== undefined) {
      this.parseLinksFromQuery(ops.familia, 'genera_loaded');
    }
    if (ops.genus !== undefined) {
      this.parseLinksFromParse(ops.genus, 'species_loaded');
    }
  }

  // this.iterateLinks(title, this.iterateLinks.bind(this));
  this.emitter.on('genera_loaded', function (parent, links) {
    console.log('genera_loaded');
    console.log(links);
    links.forEach(function (link) {
      self.parseLinksFromParse(link, 'species_loaded');
    });
  });

  this.emitter.on('species_loaded', function (parent, links) {
    console.log('species_loaded');
    const species = new Species(self.client, path.join(__dirname, '..', '..', 'data'), parent);
    species.processSpeciesList(links);
  });
};

Crawler.prototype.parseLinksFromQuery = function (title, event) {
  const params = {
    action: 'query',
    titles: title,
    prop: 'revisions',
    rvlimit: 1,
    rvprop: 'content'
  };
  var self = this;
  this.client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const links = familiae.parseQueryData(data);
    self.emitter.emitLinks(event, title, links);
  });
};

Crawler.prototype.parseLinksFromParse = function (title, event) {
  const params = {action: 'parse', page: title};
  var self = this;
  this.client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const links = accessor.getLinksFromParse(data);
    let speciesList = [];
    links.forEach(function (link) {
      const name = R.prop('*', link);
      if (Species.detectSpecies(params.page, name)) {
        console.log('is species: ' + name + ' of ' + params.page);
        speciesList.push(name);
      }
    });
    self.emitter.emitLinks(event, params.page, speciesList);
  });
};

// export the class
module.exports = Crawler;
