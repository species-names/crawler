var Crawler = require('./lib/crawler/crawler');
var stdio = require('stdio');

var options = {
  /* eslint new-cap: "off" */
  protocol: 'https',
  server: 'species.wikimedia.org',
  path: '/w',
  userAgent: 'scientificNameBot 0.0'
};

var ops = stdio.getopt({
  _meta_: {minOpts: 1},
  ordo: {key: 'o', args: 1, mandatory: false, description: 'ordo to start from'},
  familia: {key: 'f', args: 1, mandatory: false, description: 'familia to start from'},
  genus: {key: 'g', args: 1, mandatory: false, description: 'genus to start from'}
});

var crawler = new Crawler(options);
crawler.crawl(ops);
