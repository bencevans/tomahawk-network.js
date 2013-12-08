
var frame  = require('../lib/frame');
var assert = require('assert');

describe('lib/frame', function() {

  describe('#packFrame / #unpackFrame', function() {

    it('should pack and unpack a Buffer', function() {

      var payload = new Buffer(0);
      var flags   = {};

      var frameBuffer = frame.pack(flags);
      var unpackedBuffer = frame.unpack(frameBuffer);

      assert.strictEqual(unpackedBuffer.payloadLength, 0);
      assert.deepEqual(unpackedBuffer.flags, {
        "RAW": false,
        "JSON": false,
        "FRAGMENT": false,
        "COMPRESSED": false,
        "DBOP": false,
        "PING": false,
        "RESERVED_1": false,
        "SETUP": false
      }
      );
      assert.deepEqual(unpackedBuffer.payload, payload);

    });

    it('should set the correct length for a buffer', function() {

      var payload = new Buffer([1, 1, 1, 1]);
      var flags   = {};

      var frameBuffer = frame.pack(flags, payload);
      var unpackedBuffer = frame.unpack(frameBuffer);

      assert.strictEqual(unpackedBuffer.payloadLength, payload.length);
      assert.deepEqual(unpackedBuffer.flags, {
        "RAW": false,
        "JSON": false,
        "FRAGMENT": false,
        "COMPRESSED": false,
        "DBOP": false,
        "PING": false,
        "RESERVED_1": false,
        "SETUP": false
      });
      assert.deepEqual(unpackedBuffer.payload, payload);

    });

    it('should write given flags', function() {

      var payload = new Buffer(0);
      var flags   = {
        "RAW": true,
        "JSON": false,
        "FRAGMENT": true,
        "COMPRESSED": true,
        "DBOP": true,
        "PING": true,
        "RESERVED_1": true,
        "SETUP": true
      };

      var frameBuffer = frame.pack(flags, payload);
      var unpackedBuffer = frame.unpack(frameBuffer);

      assert.strictEqual(unpackedBuffer.payloadLength, payload.length);
      assert.deepEqual(unpackedBuffer.flags, flags);
      assert.deepEqual(unpackedBuffer.payload, payload);

    });

    it('should pack JSON and set JSON flag', function() {

      var payload = {};
      var flags   = {
        "RAW": false,
        "JSON": true,
        "FRAGMENT": false,
        "COMPRESSED": false,
        "DBOP": false,
        "PING": false,
        "RESERVED_1": false,
        "SETUP": false
      };

      var frameBuffer = frame.pack({}, payload);
      var unpackedBuffer = frame.unpack(frameBuffer);

      assert.deepEqual(unpackedBuffer.flags, flags);
      assert.deepEqual(unpackedBuffer.payload, payload);

    });

    it('should error on a frame length of less than 5', function() {
      assert.throws(function() {
        frame.unpack(new Buffer(4));
      });
    });

  });

});