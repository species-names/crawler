var bot = require('nodemw'),
  R = require('ramda'),
  client = new bot({
    protocol: 'https',
    server: 'species.wikimedia.org',
    path: '/w',
    userAgent: 'scientificNameBot 0.0'
  }), params = {
    action: 'parse',
    page: 'Muscicapidae'
  };

var iterateLinks = function (params, callback) {
  client.api.call(params, function (err, info, next, data) {
    const links = getLinks(data);
    links.forEach(function (link) {
      const name = R.prop('*', link);
      detectSpecies(params.page, name, function (species) {
        console.log(species);
      });
      const paramsLink = {
        action: 'parse',
        page: name
      };
      callback(paramsLink, function () {
        return;
      });
    });
  });
};

var getLinks = function (data) {
  return R.pathOr('', ['parse', 'links'], data);
};

var detectSpecies = function (genera, link, callback) {
  const first = R.head(link.split(' '));
  if (first === genera) {
    callback(link);
  }
};

iterateLinks(params, iterateLinks);

/*
 Species colelction page: parse links that have title as first name
 Species page: parse text

 Follow all links, remember links
 if already followed dont follow again

 Ordo -> Familia -> Genera -> Species
 Ordo -> Subordo -> Parvordo

 save file per Genera
 */