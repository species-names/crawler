import assert from 'assert';
import parsenames from '../lib/parsenames';
import accessor from '../lib/accessor';

var fixture = require('./fixtures/species.json');

describe('parsenames', function () {

  it('should parse names!', function () {
    const text = accessor.getContentFromQuery(fixture);
    const names = parsenames(text);
    assert.equal('Ashy Flycatcher', names.en);
    assert.equal(6, Object.keys(names).length);
  });
});
