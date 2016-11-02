var assert = require('assert');
var familiae = require('../lib/crawler/familiae');

var fixture = require('./fixtures/familia_muscicapidae_query.json');

describe('familiae', function () {
  it('should get genera links', function () {
    const links = familiae.parseQueryData(fixture);
    assert(50, links.length);
    assert('Copsychus', links[8]);
  });
});
