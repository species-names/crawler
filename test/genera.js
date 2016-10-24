var assert = require('assert');
var genera = require('../lib/genera');
var parsenames = require('../lib/parsenames');
var accessor = require('../lib/accessor');

var fixture = require('./fixtures/species.json');

describe('genera object', function () {
  it('should create object', function () {
    const text = accessor.getContentFromQuery(fixture);
    const names = parsenames(text);
    const generaObject = genera.createSpeciesObject('Muscicapa caerulescens', names);
    assert.equal('Muscicapa caerulescens', generaObject.scientific_name);
    assert.equal('en', generaObject.common_names[1].lang);
    assert.equal('Askflugsnappare', generaObject.common_names[4].name);
  });
});
