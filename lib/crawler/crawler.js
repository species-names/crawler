"use strict";

const bot = require("nodemw");
const accessor = require("./accessor");
const R = require("ramda");
const Species = require("./species");
const parser = require("./parser");
const crawlerEmitter = require("./crawlerEmitter");
const path = require("path");
const supportedClassis = ["Aves", "Mammalia", "Reptilia", "Amphibia"];

/**
 *
 * @param {object} options
 * @constructor
 */
class Crawler {
  constructor(options) {
    this.client = new bot(options);
    this.results = [];
    this.visitedLinks = [];
    this.visitedGenera = [];
    this.emitter = new crawlerEmitter();
  }
  /**
   * @param {string} title
   */
  crawl(ops) {
    var self = this;

    if (supportedClassis.indexOf(ops.classis) < 0) {
      console.log(
        "No such Classis supported: " +
          ops.classis +
          ". Use one of " +
          supportedClassis.join(", "),
      );
      return;
    }
    self.classis = ops.classis;

    if (!R.has("familia", ops) && !R.has("genus", ops) && !R.has("ordo", ops)) {
      console.log(
        "at least one option needs to be specified. run --help to see your options.",
      );
    } else {
      if (ops.familia !== undefined) {
        this.parseLinksFromQuery(ops.familia, "genera_loaded", [
          "Genera",
          "Genus",
        ]);
      }
      if (ops.genus !== undefined) {
        this.parseSpeciesLinksFromParse(ops.genus, "species_loaded");
      }
      if (ops.ordo !== undefined) {
        this.parseLinksFromQuery(ops.ordo, "familia_loaded", [
          "Familiae",
          "Familia",
        ]);
      }
    }

    // Passeriformes cant find Cladi
    this.emitter.on("genera_loaded", function (parent, links) {
      console.log(parent + ": genera_loaded");
      if (links.length === 0) {
        console.log(parent + ": nothing found, trying Subfamilia");
        self.parseLinksFromQuery(parent, "familia_loaded", [
          "Subfamiliae",
          "Subfamilia",
        ]);
      }
      links.forEach(function (link) {
        if (self.visitedGenera.indexOf(link) <= 0) {
          self.parseSpeciesLinksFromParse(link, "species_loaded");
          self.visitedGenera.push(link);
        }
      });
    });

    this.emitter.on("species_loaded", function (parent, links) {
      console.log("species_loaded");
      if (links.length === 0) {
        console.log(parent + ": nothing found");
      }
      const species = new Species(
        // @todo Vertebrata should come from options
        // @todo Aves should be parsed
        self.client,
        path.join(
          __dirname,
          "..",
          "..",
          "dataset",
          "data",
          "Vertebrata",
          self.classis,
        ),
        parent,
      );
      species.processSpeciesList(links);
    });

    this.emitter.on("familia_loaded", function (parent, links) {
      console.log("familia_loaded");
      if (links.length === 0) {
        console.log(parent + ": nothing found, trying subordines");
        if (self.visitedLinks.indexOf(parent) <= 0) {
          self.parseLinksFromQuery(parent, "subordines_loaded", [
            "Subordines",
            "Subordo",
          ]);
          self.visitedLinks.push(parent);
        }
      }
      links.forEach(function (link) {
        if (self.visitedLinks.indexOf(link) <= 0) {
          self.parseLinksFromQuery(link, "genera_loaded", ["Genera", "Genus"]);
          self.visitedLinks.push(link);
        }
      });
    });

    this.emitter.on("subordines_loaded", function (parent, links) {
      console.log("subordines_loaded");
      if (links.length === 0) {
        console.log(parent + ": nothing found");
      }
      links.forEach(function (link) {
        if (self.visitedLinks.indexOf(link) <= 0) {
          self.parseLinksFromQuery(link, "familia_loaded", [
            "Familiae",
            "Familia",
          ]);
        }
      });
    });
  }
  parseLinksFromQuery(title, event, needles) {
    const params = {
      action: "query",
      titles: title,
      prop: "revisions",
      rvlimit: 1,
      rvprop: "content",
    };
    var self = this;
    this.client.api.call(params, function (err, info, next, data) {
      if (err) {
        console.log(err.message);
        console.log(params);
        return;
      }
      let links = [];
      for (let i = 0; i < needles.length; i++) {
        links = parser.parseLinksFromQueryData(needles[i], data);
        if (links.length > 0) {
          break;
        }
      }
      self.emitter.emitLinks(event, title, links);
    });
  }
  parseSpeciesLinksFromParse(title, event) {
    const params = { action: "parse", page: title };
    var self = this;
    const split = title.split(" ");
    let customName = null;
    if (split.length > 1) {
      customName = split[0];
    }
    this.client.api.call(params, function (err, info, next, data) {
      if (err) {
        console.log(err);
        return;
      }

      const properties = accessor.getPropertiesFromParse(data);
      const links = accessor.getLinksFromParse(data);
      if (R.findIndex(R.propEq("name", "disambiguation"))(properties) >= 0) {
        links.forEach((link) => {
          const name = R.prop("*", link);
          const split = name.split(" ");
          if (split.length === 1) {
            return false;
          }
          const first = R.head(split);
          if (first === title && split[1] === "(ICZN)") {
            self.parseSpeciesLinksFromParse(name, event);
          }
        });
      } else {
        let speciesList = [];
        let genera = params.page;
        if (customName !== null) {
          genera = customName;
        }
        links.forEach(function (link) {
          const name = R.prop("*", link);
          if (Species.detectSpecies(genera, name)) {
            console.log("is species: " + name + " of " + genera);
            speciesList.push(name);
          }
        });
        self.emitter.emitLinks(event, genera, speciesList);
      }
    });
  }
}

// export the class
module.exports = Crawler;
