'use strict';

const EventEmitter = require('events');

function CrawlerEmitter() {
  EventEmitter.call(this);

  return (this);
}

CrawlerEmitter.prototype = Object.create(EventEmitter.prototype);

CrawlerEmitter.prototype.emitLinks = function (title, links) {
  this.emit(title, links);
};

module.exports = CrawlerEmitter;
