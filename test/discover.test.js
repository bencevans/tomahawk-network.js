'use strict';

var assert   = require('assert');
var discover = require('../lib/discover');

describe('lib/discover', function() {

  describe('#([DeviceListener])', function() {
    var d;

    it('should return a disover.Discover instance', function() {
      assert(discover() instanceof discover.Discover);
    });
    it('should attach listener is one provided', function() {
      var tempCb = function() {};
      d = discover(tempCb);
      assert.notEqual(d.listeners('device').indexOf(tempCb), -1);
    });
    it('should return a usable object with id, port and host');
  });

});