import assert from 'assert';
import accessor from '../lib/accessor';

var fixture = require('./fixtures/species.json');

describe('accessor', function () {

  it('should get content from query call!', function () {
    const content = accessor.getContentFromQuery(fixture);
    assert(true, (content.length >= 5));
  });
});
