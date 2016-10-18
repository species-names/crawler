import assert from 'assert';
import parsenames from '../lib/parsenames';

var fixture = require('./fixtures/species.json');

describe('parsenames', function () {

  it('should parse names!', function () {
    parsenames(fixture.query.pages);
  });
});
