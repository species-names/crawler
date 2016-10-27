var assert = require('assert');
var parsenames = require('../lib/crawler/parsenames');
var accessor = require('../lib/crawler/accessor');

var fixture = require('./fixtures/species.json');
var oneNameFixture = require('./fixtures/onenamespecies.json');

describe('parsenames', function () {
  it('should parse names!', function () {
    const text = accessor.getContentFromQuery(fixture);
    const names = parsenames(text);
    assert.equal('Ashy Flycatcher', names.en);
    assert.equal('Blougrysvlieëvanger', names.af);
    assert.equal(6, Object.keys(names).length);
  });
  it('should parse names even when only one!', function () {
    const text = accessor.getContentFromQuery(oneNameFixture);
    const names = parsenames(text);
    assert.equal('White-gorgeted Flycatcher', names.en);
    assert.equal(1, Object.keys(names).length);
  });
});
