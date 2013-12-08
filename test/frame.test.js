
var frame  = require('../lib/frame');
var assert = require('assert');

describe('lib/frame', function() {

  describe('#packFrame / #unpackFrame', function() {

    it('should pack and unpack a Buffer', function() {

      var payload = new Buffer(0);
      var flags   = {};

      var frameBuffer = frame.pack(flags, payload);
      var unpackedBuffer = frame.unpack(frameBuffer);

      assert.equal(unpackedBuffer.payloadLength, 0);
      assert.deepEqual(unpackedBuffer.flags, {"RAW":0,"JSON":0,"FRAGMENT":0,"COMPRESSED":0,"DBOP":0,"PING":0,"RESERVED_1":0,"SETUP":0});
      assert.deepEqual(unpackedBuffer.payload, payload);

    });

    it('should set the correct length for a buffer');
    it('should write given flags');
    it('should pack JSON and set JSON flag');

  });

  describe('#unpackFrame', function() {

  });

  describe('#decodeFlags', function() {

  });

  describe('#encodeFlags', function() {

  });

});