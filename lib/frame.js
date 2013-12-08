
var buffer = require('bops');

var packFrame = function (flags, body) {

  var bodyBuffer  = body;

  if(!Buffer.isBuffer(bodyBuffer)) {
    console.log('Converting to JSON');
    flags.JSON = true;
    bodyBuffer = new Buffer(JSON.stringify(bodyBuffer));
  }

  var flagsBuffer = encodeFlags(flags);
  var frameBuffer = new Buffer(5 + bodyBuffer.length);
  frameBuffer.writeUInt32BE(bodyBuffer.length, 0);
  frameBuffer.copy(frameBuffer, 4);
  bodyBuffer.copy(frameBuffer, 5);

  return frameBuffer;
};

var unpackFrame = function(frameBuffer) {

  if(frameBuffer.length < 5) {
    throw new Error('Invalid frame length');
  }

  var message = {
    payloadLength: frameBuffer.readUInt32BE(0),
    flags: decodeFlags(frameBuffer.slice(4, 5)),
  };
  message.payload = frameBuffer.slice(5, 5 + message.payloadLength);

  if(message.flags.JSON) {
    message.body = JSON.parse(mesage.body.toString('utf8'));
  }

  return message;

}

var decodeFlags = function (flagsBuffer) {

  var flagsInt = flagsBuffer.readUInt8(0);

  return {
    RAW        : flagsInt & 1,
    JSON       : flagsInt & 2,
    FRAGMENT   : flagsInt & 4,
    COMPRESSED : flagsInt & 8,
    DBOP       : flagsInt & 16,
    PING       : flagsInt & 32,
    RESERVED_1 : flagsInt & 64,
    SETUP      : flagsInt & 128
  }
}

var encodeFlags = function (flagsObj) {

  var flagsInt = 0;

  flagsInt = flagsObj.RAW        ? flagsInt : flagsInt | 1;
  flagsInt = flagsObj.JSON       ? flagsInt : flagsInt | 2;
  flagsInt = flagsObj.FRAGMENT   ? flagsInt : flagsInt | 4;
  flagsInt = flagsObj.COMPRESSED ? flagsInt : flagsInt | 8;
  flagsInt = flagsObj.DBOP       ? flagsInt : flagsInt | 16;
  flagsInt = flagsObj.PING       ? flagsInt : flagsInt | 32;
  flagsInt = flagsObj.RESERVED_1 ? flagsInt : flagsInt | 64;
  flagsInt = flagsObj.SETUP      ? flagsInt : flagsInt | 128;

  return flagsInt;
}

module.exports.unpack = unpackFrame;
module.exports.pack = packFrame;
module.exports.decodeFlags = decodeFlags;
module.exports.encodeFlags = encodeFlags;