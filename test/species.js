"use strict";
var assert = require("assert");
var species = require("../lib/crawler/species");
var accessor = require("../lib/crawler/accessor");
var parsenames = require("../lib/crawler/parsenames");

var fixture = require("./fixtures/species.json");

describe("species", function () {
  it("should detect species", function () {
    const isSpecie = species.detectSpecies("Genera", "Genera Species");
    assert.equal(true, isSpecie);
  });
  it("should not detect species", function () {
    const isSpecie = species.detectSpecies("Genera", "Genera");
    assert.equal(false, isSpecie);
  });
  it("should not detect other species", function () {
    const isSpecie = species.detectSpecies("Genera", "Tada influxis");
    assert.equal(false, isSpecie);
  });
  it("should create object", function () {
    const text = accessor.getContentFromQuery(fixture);
    const names = parsenames(text);
    const generaObject = species.createSpeciesObject(
      "Muscicapa caerulescens",
      names,
    );
    assert.equal("Muscicapa caerulescens", generaObject.scientific_name);
    assert.equal("en", generaObject.common_names[1].lang);
    assert.equal("Askflugsnappare", generaObject.common_names[4].name);
    assert.equal("Synonmeone", generaObject.common_names[3].synonyms[0]);
  });
});
