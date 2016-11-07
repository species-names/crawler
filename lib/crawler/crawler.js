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

  /*
   check ops
   if classis: load Classis
   if ordo: loadOrdo
   if familia: loadFamilia
   if genera: loadGenera
   if species: loadSpecies
   */
  if (ops.familia !== undefined) {
    this.parseLinksFromQuery(ops.familia, 'genera_loaded');
  }

  // this.iterateLinks(title, this.iterateLinks.bind(this));
  this.emitter.on('genera_loaded', function (parent, links) {
    console.log('genera_loaded');
    console.log(links);
    self.parseLinksFromParse(links[0], 'species_loaded');
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

// Crawler.prototype.iterateLinks = function (title, callback) {
//   let visitedLinks = [];
//   const params = {action: 'parse', page: title};
//   var self = this;
//   this.client.api.call(params, function (err, info, next, data) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const links = accessor.getLinksFromParse(data);
//     let speciesList = [];
//     let otherLinks = [];
//     links.forEach(function (link) {
//       const name = R.prop('*', link);
//       if (species.detectSpecies(params.page, name)) {
//         console.log('is species: ' + name + ' of ' + params.page);
//         speciesList.push(name);
//       } else if (name.length > 0) {
//         otherLinks.push(name);
//       }
//     });
//
//     if (speciesList.length === 0) {
//       otherLinks.forEach(function (name) {
//         if (R.indexOf(name, visitedLinks) === -1 && name !== '') {
//           console.log('calling next link: ' + name);
//           visitedLinks.push(name);
//           callback(name, function () {
//             return;
//           });
//         }
//       });
//     } else {
//       self.processList(params.page, speciesList);
//     }
//   });
// };var self = this;
//

// export the class
module.exports = Crawler;
