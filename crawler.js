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
  familia: {key: 'f', args: '*', mandatory: true, description: 'familia to start from'}
});

var crawler = new Crawler(options);
crawler.crawl(ops);
