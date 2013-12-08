'use strict';

var net  = require('net');
var uuid = require('uuid');
var messages = require('./messages');
var frame = require('./frame');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Connection = function(options) {
  var node = this;

  this.options = options || {};
  this.socket = null;
  this.nodeId = this.options.nodeId || uuid.v4();
  this.serverPort = false;


  this.connect = function(options) {
    node.socket = net.connect(options || this.options);
    node.socket.on('connect', this._onConnect);
    node.socket.on('data',    this._onData);
    node.socket.on('end',     this._onEnd);
  };

  this._onConnect = function() {
    console.log('_onConnect');

    var message = messages.initiateConnection({
      nodeId: node.nodeId,
      key:    'whitelist',
      port: 3000
    });

    node.socket.write(message);

    setInterval(function() {
      node.socket.write(frame.pack({ PING:true }));
    }, 5000);
  };

  this._onData = function(data) {
    console.log('_onData');
    var message = frame.unpack(data);

    console.log('Received:', message);

    if(message.flags.SETUP) {
      var reply;
      if(message.payload.toString() === '4') {
        reply = frame.pack({ SETUP: true }, new Buffer('ok', 'utf8'));
      } else {
        reply = frame.pack({}, { method: 'protovercheckfail' });
      }
      return node.socket.write(reply);
    }

    if(message.flags.PING) {
      // Can disregard
      return;
    }

    if(message.payload.method === 'dbsync-offer') {

    }

    console.log('Unknown _onData handle');

  };

  this._onEnd = function() {
    console.log('_onEnd');
  };

  return this;

};
util.inherits(Connection, EventEmitter);

module.exports.Connection = Connection;