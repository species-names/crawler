var bot = require('nodemw');
var R = require('ramda');
var accessor = require('./lib/accessor');
var parsenames = require('./lib/parsenames');
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
  page: 'Muscicapidae' //Stiphrornis
};

/*
 Species colelction page: parse links that have title as first name
 Species page: parse text

 Follow all links, remember links
 if already followed dont follow again

 Ordo -> Familia -> Genera -> Species
 Ordo -> Subordo -> Parvordo

 save file per Genera

 iterateLinks ->

 use async paralell

 species = [];
 if(detectSpecies(genera, link)){
 species.push(link);
 }

 loadSpecies(species){
 calls = createcalls(species)
 async.parallel(Calls, function(err, results) {
 console.log('async callback: '+JSON.stringify(results));
 //write to file
 });
 }
 promisesAll

 or use promises ?
 https://github.com/cujojs/when
 https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 https://github.com/petkaantonov/bluebird
 https://alexperry.io/node/2015/03/25/promises-in-node.html

 */

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
      }
      else {
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
    }
    else {
      console.log(speciesList);
    }
    //   const species = detectSpecie(params.page, name);
    //
    //   console.log(species);
    //   if (species !== undefined) {
    //     generae[params.page] = species;
    //   }
    // console.log(generae);
    // generae.forEach(function (species, genera) {
    //   const file = './data/' + genera + '.json';
    //   jsonfile.writeFile(file, species, function (err) {
    //     console.error(err)
    //   });

  });
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
    if (err) {
      console.log(err);
      return;
    }
    const text = accessor.getContentFromQuery(data);
    names = parsenames(text);
  });

  return names;
};

iterateLinks(params, iterateLinks);
