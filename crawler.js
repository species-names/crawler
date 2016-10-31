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
  page: {key: 'p', args: '*', mandatory: true, description: 'page title to start from'}
});

var crawler = new Crawler(options);
crawler.crawl(ops.page);
