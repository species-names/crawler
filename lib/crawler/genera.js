"use strict";

const accessor = require("./accessor");

module.exports.loadGenera = function (client, genera, emitter) {
  const params = {
    action: "query",
    titles: genera,
    prop: "revisions",
    rvlimit: 1,
    rvprop: "content",
  };
  var self = this;
  client.api.call(params, function (err, info, next, data) {
    if (err) {
      console.log(err);
      return;
    }
    const links = self.parseQueryData(data);
    emitter.emitGenera(links);
  });
};

module.exports.parseQueryData = function (str) {
  let links = [];
  let text = accessor.getContentFromQuery(str);
  if (text) {
    const regex = /Species:.*/g;
    let m;

    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      if (m[0] !== undefined) {
        let generaRaw = m[0].substr(m[0].indexOf("{")).trim().split("}} {{");
        generaRaw.forEach(function (link) {
          const splitted = link.split("|");
          if (splitted.length > 0) {
            links.push(splitted[1].replace(/\}/gm, "").trim());
          }
        });
      }
    }
    return links;
  }
};
