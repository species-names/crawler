'use strict';
var assert = require('assert');
var species = require('../lib/species');

describe('species', function () {
  it('should detect species', function () {
    const isSpecie = species.detectSpecies('Genera', 'Genera Species');
    assert.equal(true, isSpecie);
  });
  it('should not detect species', function () {
    const isSpecie = species.detectSpecies('Genera', 'Genera');
    assert.equal(false, isSpecie);
  });
  it('should not detect other species', function () {
    const isSpecie = species.detectSpecies('Genera', 'Tada influxis');
    assert.equal(false, isSpecie);
  });
});
