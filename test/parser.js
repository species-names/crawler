"use strict";

var assert = require("assert");
var parser = require("../lib/crawler/parser");

var fixtureFamilia = require("./fixtures/familia_muscicapidae_query.json");
var fixtureFamiliaGenus = require("./fixtures/familia_with_genus.json");
var fixtureFamiliaeLinkFormat2 = require("./fixtures/familiae_linkformat2.json");

describe("parser", function () {
  it("should parse links from genera", function () {
    const links = parser.parseLinksFromQueryData("Genera", fixtureFamilia);
    assert.equal("Calliope", links[3]);
    assert.equal(50, links.length);
  });
  it("should parse links from familia with genus", function () {
    const links = parser.parseLinksFromQueryData("Genus", fixtureFamiliaGenus);
    assert.equal("Sagittarius", links[0]);
    assert.equal(1, links.length)
  });
  it("should parse links from familia with square bracket link format", function () {
    const links = parser.parseLinksFromQueryData(
      "Familiae",
      fixtureFamiliaeLinkFormat2,
    );
    assert.equal("Dromaiidae", links[1]);
    assert.equal(2, links.length);
  });
});
