var bot = require('nodemw');
var R = require('ramda');
var jsonfile = require('jsonfile');
var accessor = require('./lib/accessor');
var species = require('./lib/species');

var client = new bot({
  /* eslint new-cap: "off" */
  protocol: 'https',
  server: 'species.wikimedia.org',
  path: '/w',
  userAgent: 'scientificNameBot 0.0'
});
var params = {
  action: 'parse',
  page: 'Stiphrornis' // Muscicapidae
};
var results = [];

var processList = function (name, list) {
  var specieQuery;
  if (list.length === 0) {
    // complete
    const file = './data/' + name + '.json';
    jsonfile.writeFile(file, results, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('written: ' + file);
    });
    return;
  }

  specieQuery = list.pop();

  species.getSpecie(client, specieQuery, function (result) {
    results.push(result);
    processList(name, list);
  });
};

var iterateLinks = function (params, callback) {
  var visitedLinks = [];
  client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const links = accessor.getLinksFromParse(data);
    var speciesList = [];
    var otherLinks = [];
    links.forEach(function (link) {
      const name = R.prop('*', link);
      if (species.detectSpecies(params.page, name)) {
        console.log('is species: ' + name);
        speciesList.push(name);
      } else {
        otherLinks.push(name);
      }
    });

    if (speciesList.length === 0) {
      otherLinks.forEach(function (name) {
        const paramsLink = {
          action: 'parse',
          page: name
        };
        if (R.indexOf(name, visitedLinks) === -1) {
          console.log('calling next link: ' + name);
          callback(paramsLink, function () {
            visitedLinks.push(name);
            return;
          });
        }
      });
    } else {
      console.log(speciesList);
      processList(params.page, speciesList);
    }
  });
};

iterateLinks(params, iterateLinks);
