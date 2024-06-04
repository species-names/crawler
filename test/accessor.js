var assert = require("assert");
var accessor = require("../lib/crawler/accessor");

var fixtureSpecies = require("./fixtures/species.json");
var fixtureGenera = require("./fixtures/genus_stiphronis_parse.json");

describe("accessor", function () {
  it("should get content from query call!", function () {
    const content = accessor.getContentFromQuery(fixtureSpecies);
    assert.equal(true, content.length >= 5);
  });

  it("should get links from parse!", function () {
    const content = accessor.getLinksFromParse(fixtureGenera);
    assert.equal("Chordata", content[3]["*"]);
  });
});
