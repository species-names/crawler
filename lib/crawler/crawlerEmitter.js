"use strict";

const EventEmitter = require("events");

function CrawlerEmitter() {
  EventEmitter.call(this);

  return this;
}

CrawlerEmitter.prototype = Object.create(EventEmitter.prototype);

CrawlerEmitter.prototype.emitLinks = function (title, parent, links) {
  this.emit(title, parent, links);
};

module.exports = CrawlerEmitter;
