'use strict';

var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Discover = function(options) {
  var discover = this;

  this.options = options;

  this.socket = dgram.createSocket('udp4');

  this.socket.on('message', function(data, info) {
    if(data.toString().match(/^TOMAHAWKADVERT/)) {
      var split = data.toString().split(':');
      discover.emit('device', {
        port: parseInt(split[1], 10),
        nodeId: split[2],
        name: split[3],
        meta: info
      });
    }
  });

  this.socket.bind(50210);

  setInterval(function() {
    discover.advertise();
  }, 60000);

  return this;

};
util.inherits(Discover, EventEmitter);

Discover.prototype.advertise = function() {
  var message = new Buffer('TOMAHAWKADVERT:' + this.options.port + ':' + this.options.nodeId);
  return this.socket.send(message, 0, message.length, 50210);
};

module.exports.Discover = Discover;