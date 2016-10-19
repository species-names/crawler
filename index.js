var bot = require('nodemw');
var R = require('ramda');
var accessor = require('./lib/accessor');
var parsenames = require('./lib/parsenames');
var jsonfile = require('jsonfile');
var genera = require('./lib/genera');

var client = new bot({
  /* eslint new-cap: "off" */
  protocol: 'https',
  server: 'species.wikimedia.org',
  path: '/w',
  userAgent: 'scientificNameBot 0.0'
});
var params = {
  action: 'parse',
  page: 'Stiphrornis'
};

/*
 Species colelction page: parse links that have title as first name
 Species page: parse text

 Follow all links, remember links
 if already followed dont follow again

 Ordo -> Familia -> Genera -> Species
 Ordo -> Subordo -> Parvordo

 save file per Genera
 */

var iterateLinks = function (params, callback) {
  client.api.call(params, function (err, info, next, data) {
    const links = getLinks(data);
    var generae = [];
    links.forEach(function (link) {
      const name = R.prop('*', link);
      console.log(name);
      /*
       if link has species
       its a genera
       */
      const species = detectSpecie(params.page, name);
      console.log(species);
      if (species !== undefined) {
        generae[params.page] = species;
      }
      const paramsLink = {
        action: 'parse',
        page: name
      };
      // callback(paramsLink, function () {
      //   return;
      // });
    });
    console.log(generae);
    generae.forEach(function (species, genera) {
      const file = './data/' + genera + '.json';
      jsonfile.writeFile(file, species, function (err) {
        console.error(err)
      });
    });
  });
};

var getLinks = function (data) {
  return R.pathOr('', ['parse', 'links'], data);
};

var detectSpecie = function (genera, link) {
  const first = R.head(link.split(' '));
  if (first === genera) {
    const names = getSpecie(link);
console.log(names);
    return names;
  }
};

var getSpecie = function (name) {
  const params = {
    action: 'query',
    titles: name,
    prop: 'revisions',
    rvlimit: 1,
    rvprop: 'content'
  };
  var names = undefined;
  client.api.call(params, function (err, info, next, data) {
    const text = accessor.getContentFromQuery(data);
    names = parsenames(text);
  });

  return names;
};

iterateLinks(params, iterateLinks);
