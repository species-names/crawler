'use strict';

var bot = require('nodemw');
var accessor = require('./accessor');
var R = require('ramda');
var Species = require('./species');
var parser = require('./parser');
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
  this.visitedLinks = [];
  this.emitter = new crawlerEmitter();
}

/**
 *
 * @param {string} title
 */
Crawler.prototype.crawl = function (ops) {
  var self = this;

  if (!R.has('familia', ops) && !R.has('genus', ops) && !R.has('ordo', ops)) {
    console.log('at least one option needs to be specified. run --help to see your options.');
  } else {
    if (ops.familia !== undefined) {
      this.parseLinksFromQuery(ops.familia, 'genera_loaded', ['Genera', 'Genus']);
    }
    if (ops.genus !== undefined) {
      this.parseSpeciesLinksFromParse(ops.genus, 'species_loaded');
    }
    if (ops.ordo !== undefined) {
      this.parseLinksFromQuery(ops.ordo, 'familia_loaded', ['Familiae', 'Familia']);
    }
  }

  // Passeriformes cant find Cladi

  this.emitter.on('genera_loaded', function (parent, links) {
    console.log(parent + ': genera_loaded');
    if (links.length === 0) {
      console.log(parent + ': nothing found, trying Subfamilia');
      self.parseLinksFromQuery(parent, 'familia_loaded', ['Subfamiliae', 'Subfamilia']);
    }
    links.forEach(function (link) {
      if (self.visitedLinks.indexOf(link) <= 0) {
        self.parseSpeciesLinksFromParse(link, 'species_loaded');
        self.visitedLinks.push(link);
      }
    });
  });

  this.emitter.on('species_loaded', function (parent, links) {
    console.log('species_loaded');
    if (links.length === 0) {
      console.log(parent + ': nothing found');
    }
    const species = new Species(
      // @todo Vertebrata should come from options
      // @todo Aves should be parsed
      self.client, path.join(__dirname, '..', '..', 'data', 'data', 'Vertebrata', 'Aves'),
      parent
    );
    species.processSpeciesList(links);
  });

  this.emitter.on('familia_loaded', function (parent, links) {
    console.log('familia_loaded');
    if (links.length === 0) {
      console.log(parent + ': nothing found, trying subordines');
      if (self.visitedLinks.indexOf(parent) <= 0) {
        self.parseLinksFromQuery(parent, 'subordines_loaded', ['Subordines', 'Subordo']);
        self.visitedLinks.push(parent);
      }
    }
    links.forEach(function (link) {
      if (self.visitedLinks.indexOf(link) <= 0) {
        self.parseLinksFromQuery(link, 'genera_loaded', ['Genera', 'Genus']);
        self.visitedLinks.push(link);
      }
    });
  });

  this.emitter.on('subordines_loaded', function (parent, links) {
    console.log('subordines_loaded');
    if (links.length === 0) {
      console.log(parent + ': nothing found');
    }
    links.forEach(function (link) {
      if (self.visitedLinks.indexOf(link) <= 0) {
        self.parseLinksFromQuery(link, 'familia_loaded', ['Familiae', 'Familia']);
      }
    });
  });
};

Crawler.prototype.parseLinksFromQuery = function (title, event, needles) {
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
    let links = [];
    for (let i = 0; i < needles.length; i++) {
      links = parser.parseLinksFromQueryData(needles[i], data);
      if (links.length > 0) {
        break;
      }
    }

    self.emitter.emitLinks(event, title, links);
  });
};

Crawler.prototype.parseSpeciesLinksFromParse = function (title, event) {
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
